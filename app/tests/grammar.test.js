const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),A=require('../agent-core.js'),P=require('../agent-planner.js');
const box={window:{}};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../fullbody.js'),'utf8'),box);
const data=(args={})=>P.payload(A.prepare({zone:'general',fatigue:7,library:box.window.PAUSA_LIBRARY,...args}));
const tokenizer={eos_token_id:256,encode:text=>[...text].map(c=>c.charCodeAt(0))};
const hf={LogitsProcessor:class{},LogitsProcessorList:class extends Array{}};
function decodeAllowed(d,text,options,kind='pick'){const processor=(kind==='count'?P.countGrammar(hf,tokenizer,P.counts(d,options)):P.grammar(hf,tokenizer,d,options))[0],ids=[];
 for(const token of tokenizer.encode(text)){const logits={data:new Float32Array(300).fill(1)};processor._call([ids],logits);if(!Number.isFinite(logits.data[token]))return false;ids.push(token);}
 const logits={data:new Float32Array(300).fill(1)};processor._call([ids],logits);return Number.isFinite(logits.data[tokenizer.eos_token_id]);
}
test('decodificación variable permite cerrar o continuar, incluidos cuatro movimientos reales',()=>{
 const d=data({zone:'cuello'});for(const pick of [[2],[2,3],[0,1,2],[0,1,2,3]])assert.equal(decodeAllowed(d,JSON.stringify({pick})),true);
 const agile=data({zone:'cuello',mode:'agile'});assert.equal(decodeAllowed(agile,'{"pick":[0,1,2,3]}'),false);assert.equal(decodeAllowed(agile,'{"pick":[2]}'),true);
});
test('prefijos numéricos y cierres no permiten IDs inexistentes ni propuestas incompletas',()=>{
 const d=data();assert.equal(decodeAllowed(d,'{"pick":[10,0,12,18]}'),true);assert.equal(decodeAllowed(d,'{"pick":[0]}'),false);assert.equal(decodeAllowed(d,'{"pick":[99]}'),false);assert.equal(decodeAllowed(d,'{"pick":[0,0]}'),false);
});
test('la gramática impide una selección repetida cuando se pide otra combinación',()=>{
 const d=data({zone:'cuello'});d.previous=[d.candidates.map(x=>x.id)];assert.equal(decodeAllowed(d,'{"pick":[0,1,2,3]}',{requireChange:true}),false);assert.equal(decodeAllowed(d,'{"pick":[2,3]}',{requireChange:true}),true);
});


test('la decisión de cantidad precede la selección y su gramática solo permite números viables',()=>{
 const d=data({zone:'cuello'});assert.equal(decodeAllowed(d,'{"count":4}',{},'count'),true);assert.equal(decodeAllowed(d,'{"count":5}',{},'count'),false);
 assert.equal(decodeAllowed(data({zone:'cuello',mode:'agile'}),'{"count":4}',{},'count'),false);
 assert.equal(decodeAllowed(d,'{"pick":[0,1,2]}',{exactCount:4}),false);assert.equal(decodeAllowed(d,'{"pick":[0,1,2,3]}',{exactCount:4}),true);
});
