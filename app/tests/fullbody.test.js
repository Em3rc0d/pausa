'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'assets/fullbody/catalog.json'),'utf8'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('Los 112 GIF y 112 PNG están completos e íntegros',()=>{
 assert.equal(data.length,112);
 assert.equal(new Set(data.map(x=>x.id)).size,112);
 const gifs=fs.readdirSync(path.join(root,'assets/fullbody/gifs')).filter(x=>x.endsWith('.gif'));
 const pngs=fs.readdirSync(path.join(root,'assets/fullbody/posters')).filter(x=>x.endsWith('.png'));
 assert.equal(gifs.length,112);assert.equal(pngs.length,112);
 for(const item of data){
   const g=path.join(root,item.gif),p=path.join(root,item.poster);
   assert.ok(fs.existsSync(g),item.gif);assert.ok(fs.existsSync(p),item.poster);
   assert.equal(sha(g),item.sha256,item.id+' GIF');
   assert.equal(sha(p),item.poster_sha256,item.id+' PNG');
   assert.match(fs.readFileSync(g).subarray(0,6).toString(),/^GIF8[79]a$/);
   assert.deepEqual(Array.from(fs.readFileSync(p).subarray(0,8)),[137,80,78,71,13,10,26,10]);
 }
});
test('La biblioteca completa llega al HTML de la PWA y sus medios son locales',()=>{
 const js=fs.readFileSync(path.join(root,'fullbody.js'),'utf8');
 const vm=require('node:vm');const sandbox={window:{}};vm.runInNewContext(js,sandbox);
 assert.equal(sandbox.window.PAUSA_LIBRARY.length,112);
 assert.equal(new Set(sandbox.window.PAUSA_LIBRARY.map(x=>x.id)).size,112);
 for(const entry of sandbox.window.PAUSA_LIBRARY){
  assert.ok(entry.gif.startsWith('assets/fullbody/gifs/'));
  assert.ok(entry.poster.startsWith('assets/fullbody/posters/'));
 }
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.match(index,/src="fullbody\.js(?:\?v=[0-9.]+)?"/);
 assert.match(index,/data-nav="biblioteca"/);
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 for(const id of ['pelvic-tilt','cat-cow','knee-rolls','glute-bridge','bird-dog'])assert.ok(app.includes(id));
});
