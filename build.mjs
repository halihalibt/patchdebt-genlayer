import fs from 'node:fs';import {createHash} from 'node:crypto';import {build} from 'esbuild';
fs.mkdirSync('dist',{recursive:true});fs.copyFileSync('index.html','dist/index.html');for(const dir of ['assets','examples','intelligent-contract/contracts'])fs.cpSync(dir,'dist/'+dir,{recursive:true});fs.copyFileSync('deployment.json','dist/deployment.json');await build({entryPoints:['src/app.js'],bundle:true,format:'esm',target:'es2022',outfile:'dist/app.js',minify:true});

const bundleHash=createHash('sha256').update(fs.readFileSync('dist/app.js')).digest('hex').slice(0,16);fs.writeFileSync('dist/index.html',fs.readFileSync('index.html','utf8').replace('src="./app.js"','src="./app.js?v='+bundleHash+'"'));

const styleHash=createHash("sha256").update(fs.readFileSync("dist/assets/readability.css")).digest("hex").slice(0,16);fs.writeFileSync("dist/index.html",fs.readFileSync("dist/index.html","utf8").replace("./assets/readability.css", "./assets/readability.css?v="+styleHash));
