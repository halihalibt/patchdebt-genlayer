import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
test('CLI binds actual HEAD, writes error artifacts, rejects uncommitted input and remains pending without dossier',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'patchdebt-cli-'));
 const cli=path.resolve('cli/check.mjs'),out=path.join(dir,'report.json');
 const git=(...args)=>execFileSync('git',args,{cwd:dir,stdio:'pipe'}).toString().trim();
 try{
 git('init');git('config','user.name','test');git('config','user.email','test@example.test');
 fs.copyFileSync('examples/pr-check/after-input.json',path.join(dir,'input.json'));git('add','input.json');git('commit','-m','input');
 const run=(...args)=>spawnSync(process.execPath,[cli,'--root',dir,'--input','input.json','--repository','owner/repo','--out',out,...args],{encoding:'utf8'});
 assert.equal(run().status,3);assert.equal(JSON.parse(fs.readFileSync(out)).commit,git('rev-parse','HEAD'));
 assert.equal(run('--commit','a'.repeat(40)).status,2);assert.match(JSON.parse(fs.readFileSync(out)).message,/differs/);
 fs.appendFileSync(path.join(dir,'input.json'),'\n');assert.equal(run().status,2);assert.match(JSON.parse(fs.readFileSync(out)).message,/Uncommitted/);
 assert.equal(run('--dossier','missing.json').status,2);assert.ok(fs.existsSync(out.replace('.json','.md')));
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
