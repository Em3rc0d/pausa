import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('mk1/build/source-manifest.json'));
const phases=['brainstorming','design','arch','plan','build','test','quarries','mining-site'];
for(const mk of ['mk0','mk1','mk2'])for(const phase of phases){
  const dir=path.join(root,mk,phase);
  assert.ok(fs.statSync(dir).isDirectory(),`${mk}/${phase}`);
  assert.ok(fs.readdirSync(dir).length,`Empty phase: ${mk}/${phase}`);
}
// The import manifest is immutable evidence for v1.11, not a lock on future releases.
assert.equal(manifest.version,'1.11.0');
assert.equal(JSON.parse(read('app/package.json')).version,'1.12.0');
assert.equal(JSON.parse(read('package.json')).version,'1.12.0');
const mk2Changed=new Set([
 'app/README.md','app/_headers','app/agent-ui.js','app/agent-worker.js','app/app.js','app/core.js',
 'app/data.js','app/index.html','app/package.json','app/styles.css','app/sw.js',
 'app/tests/catalog.test.js','app/tests/core.test.js','app/tests/experience.test.js','app/tests/update.test.js'
]);
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
for(const entry of manifest.files){
  const bytes=fs.readFileSync(path.join(root,entry.path));
  if(mk2Changed.has(entry.path)){assert.ok(bytes.length>0,entry.path);continue;}
  assert.equal(bytes.length,entry.bytes,entry.path);
  assert.equal(hash(bytes),entry.sha256,`Original import unexpectedly changed: ${entry.path}`);
}
for(const [dir,extension,total] of [['app/assets/fullbody/gifs','.gif',112],['app/assets/fullbody/posters','.png',112]]){
  assert.equal(fs.readdirSync(path.join(root,dir)).filter(x=>x.endsWith(extension)).length,total,dir);
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  if(e.name==='.git'||e.name==='node_modules')return [];
  const p=path.join(dir,e.name);return e.isDirectory()?files(p):[p];
});}
let links=0,documents=0;
const all=files(root);
for(const p of all.filter(p=>p.endsWith('.md')&&!p.startsWith(path.join(root,'app')+path.sep))){
  documents++;
  for(const match of fs.readFileSync(p,'utf8').matchAll(/!?\[[^\]]*\]\(([^\s)]+)\)/g)){
    const url=match[1];if(/^(https?:|mailto:|#)/.test(url))continue;
    const relative=decodeURIComponent(url.split('#')[0]);if(!relative)continue;
    const target=path.resolve(path.dirname(p),relative);
    assert.ok(target===root||target.startsWith(root+path.sep),`Link leaves repository: ${url}`);
    assert.ok(fs.existsSync(target),`Broken link in ${path.relative(root,p)}: ${url}`);links++;
  }
}
const credential=/(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
for(const p of all.filter(p=>!/[.](gif|png)$/.test(p))){
  assert.ok(!credential.test(fs.readFileSync(p,'utf8')),`Credential-shaped content: ${path.relative(root,p)}`);
}
assert.ok(!fs.existsSync(path.join(root,'.github/workflows')),'Import must not introduce GitHub Actions workflows');
console.log(JSON.stringify({status:'passed',snapshotFiles:manifest.files.length,documents,localLinks:links,gifs:112,posters:112,originalImportVersion:manifest.version,currentVersion:'1.12.0',changedMK2:mk2Changed.size},null,2));
