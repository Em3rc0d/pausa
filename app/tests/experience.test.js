const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
test('la interfaz compone con inferencia real y nunca llama al clasificador anterior',()=>{
 const ui=read('agent-ui.js'),worker=read('agent-worker.js');
 assert.match(worker,/pipeline\('text-generation'/);assert.doesNotMatch(worker,/feature-extraction|cosine/);
 assert.match(ui,/await workerCompose/);assert.match(ui,/P.accept/);assert.doesNotMatch(ui,/quickInference|600\)|agentOtherZones/);
 assert.doesNotMatch(ui,/agentTransformer|Descargando el modelo|MODELO LOCAL/);
});
test('composición cancelable, errores explícitos y respeto al ahorro de datos',()=>{
 const ui=read('agent-ui.js');assert.match(ui,/conn.saveData/);assert.match(ui,/cancelGeneration/);assert.match(ui,/No he podido componer/);assert.match(ui,/snapshot!==JSON.stringify\(draft\)/);
});
test('versión y worker generativo coinciden con los recursos de la PWA',()=>{
 assert.match(read('agent-ui.js'),/agent-worker\.js\?v=1\.12\.0/);assert.match(read('index.html'),/Privado · v1\.12\.0/);assert.match(read('sw.js'),/agent-planner.js/);
});

test('la guía identifica la escala como cansancio/rigidez y no ofrece un bloqueo numérico por dolor',()=>{
 const ui=read('agent-ui.js');assert.match(ui,/¿Cuánto cansancio o rigidez notas/);assert.match(ui,/agentFatigue/);assert.doesNotMatch(ui,/agentIntensity|Con esta molestia|molestia importante/);assert.match(ui,/Esta escala mide cansancio o rigidez/);assert.match(ui,/durationLabel\(p.seconds\)/);
});

test('el aviso aparece antes del formulario y crear no impone un cuestionario adicional',()=>{
 const ui=read('agent-ui.js');assert.ok(ui.indexOf('guide-general-notice')<ui.indexOf('<form id="agentForm"'));assert.match(ui,/problema frecuente, persistente o que empeora/);assert.doesNotMatch(ui,/chooseSafety\(\(\)=>generate/);assert.doesNotMatch(ui,/pain-outside-scope/);
});

test('camino sentado inmediato y aviso de modelo pesado',()=>{
 assert.match(read('app.js'),/data-routine="seated"/);
 assert.match(read('agent-ui.js'),/sin IA ni descarga/);
 assert.match(read('app.js'),/showSystemReminder/);
});

test('la pantalla, el toggle y el offline reutilizan el mismo recurso HQ de la rutina sentada',()=>{
 const app=read('app.js'),sw=read('sw.js');
 assert.match(app,/function guidedMedia\(id\)/);
 assert.match(app,/const useNew=guidedMedia\(id\)/);
 assert.match(app,/const a=guidedMedia\(id\)/);
 assert.match(app,/\|\|guidedMedia\(r\.ids\[0\]\)/);
 for(const media of ['090-seated-overhead-bilateral','081-seated-heels-bilateral','087-seated-side-bend-bilateral']){
  assert.ok(sw.includes(media+'.png'),media+' poster no precargado');
  assert.ok(sw.includes(media+'.gif'),media+' GIF no precargado');
 }
 assert.match(sw,/cache\.match\(req\)\|\|await caches\.match\(req\)/);
});

test('el historial muestra segundos exactos, barras precisas y concordancia singular/plural',()=>{
 const app=read('app.js');
 assert.match(app,/recorded=Core\.elapsedParts\(Core\.sumSeconds\(state\.logs\)\)/);
 assert.match(app,/Core\.formatElapsed\(l\.seconds\)/);
 assert.match(app,/day\.seconds\/max\*100/);
 assert.match(app,/count===1\?'Sesión completada':'Sesiones completadas'/);
 assert.match(app,/t\.streak===1\?'día':'días'/);
});
