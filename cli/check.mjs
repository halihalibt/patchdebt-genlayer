#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {checkMigration,markdown} from './gate.js';
import {ChainDesk} from '../src/chain.js';

const toolRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),options={};
for(let i=0;i<args.length;i+=2){if(!['--root','--input','--dossier','--baseline','--out','--repository','--commit'].includes(args[i])||!args[i+1])throw Error('Usage: node cli/check.mjs --input input.json [--dossier dossier.json] [--baseline baseline.json] [--root checkout] [--out report.json] [--repository owner/repo] [--commit SHA]');options[args[i].slice(2)]=args[i+1];}
const root=path.resolve(options.root || '.');
function read(file){const target=fs.realpathSync(path.resolve(root,file));if(!target.startsWith(root+path.sep))throw Error('Input files must be inside the checkout.');if(fs.statSync(target).size>2000000)throw Error('Input exceeds 2 MB.');return JSON.parse(fs.readFileSync(target,'utf8'));}
let commit,report;
try {
  commit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
  if(options.commit && options.commit!==commit)throw Error('Checkout HEAD differs from requested commit.');
  options.input ||= '.patchdebt/input.json';
  // Every supplied input must be inside the checkout and identical to HEAD.
  for(const key of ['input','dossier','baseline'])if(options[key]){
    read(options[key]);
    const relative=path.relative(root,fs.realpathSync(path.resolve(root,options[key])));
    const committed=execFileSync('git',['show',`${commit}:${relative}`],{cwd:root});
    if(!committed.equals(fs.readFileSync(path.join(root,relative))))throw Error('Uncommitted '+key+' cannot be bound to HEAD.');
  }
  const manifest=JSON.parse(fs.readFileSync(path.join(toolRoot,'deployment.json'),'utf8'));
  const storage={getItem:()=>null,setItem(){},removeItem(){}};
  const desk=new ChainDesk({expectedHash:manifest.source_sha256,manifest,storage});
  const input=read(options.input || '.patchdebt/input.json');
  if(options.dossier)await desk.bind(manifest.address);
  report=await checkMigration({input,dossier:options.dossier?read(options.dossier):null,baseline:options.baseline?read(options.baseline):null,commit,repository:options.repository || process.env.GITHUB_REPOSITORY,desk});
}catch(e){report={protocol:'patchdebt-pr-check-v1',status:'ERROR',exit_code:2,repository:options.repository || process.env.GITHUB_REPOSITORY,commit,message:e.message,provenance:'Verification failed; no approval is granted.'};}
const output=path.resolve(options.out || 'patchdebt-report.json');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');fs.writeFileSync(output.replace(/\.json$/,'')+'.md',markdown(report));
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,markdown(report));
console.log(`${report.status}: ${report.message}`);process.exitCode=report.exit_code;
