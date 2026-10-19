const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const root=path.join(__dirname,'..');
const get=f=>fs.readFileSync(path.join(root,f),'utf8');
test('coherencia de versión en interfaz y archivos',()=>{
  assert.match(get('index.html'),/Privado · v1\.12\.0/);
  assert.match(get('agent-ui.js'),/UNA PAUSA A TU MEDIDA · V1\.12\.0/);
  for(const f of ['styles.css','fullbody.js','data.js','core.js','agent-core.js','agent-planner.js','app.js','agent-ui.js'])assert.ok(get('index.html').includes(f+'?v=1.12.0'),f);
  assert.equal(JSON.parse(get('package.json')).version,'1.12.0');
});
test('el nuevo service worker no utiliza cache-first para código ni páginas',()=>{
  const sw=get('sw.js');assert.match(sw,/pausa-shell-v1\.12\.0/);
  assert.match(sw,/const response=await fetch\(req\)/);
  assert.match(sw,/ignoreSearch:true/);
  assert.match(get('app.js'),/updateViaCache:'none'/);
});
