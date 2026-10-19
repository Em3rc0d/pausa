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
