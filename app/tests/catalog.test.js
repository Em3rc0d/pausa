const assert=require('node:assert/strict');
const test=require('node:test');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'..','data.js'),'utf8');
const ctx=vm.createContext({});
vm.runInContext(src+'\nthis.catalog={routines:ROUTINES,exercises:EXERCISES};',ctx);
const {routines,exercises}=ctx.catalog;
test('cada rutina contiene ejercicios existentes con instrucciones',()=>{
 assert.ok(routines.length>=4);
 for(const r of routines){assert.ok(r.ids.length>=3);let total=0;for(const id of r.ids){const ex=exercises[id];assert.ok(ex,`missing ${id}`);assert.ok(ex.steps.length>=3,`missing steps ${id}`);assert.ok(ex.seconds>=30&&ex.seconds<=120);assert.equal(ex.steps.every(x=>typeof x==='string'&&x.length>15),true);total+=ex.seconds}assert.equal(total,r.total)}
});
test('las rutinas de escritorio no requieren colchoneta',()=>{for(const r of routines.filter(x=>x.category==='escritorio'))for(const id of r.ids)assert.equal(exercises[id].place.includes('colchoneta'),false)});
test('el catálogo inicial es original y no usa media externa',()=>{assert.ok(!/gymvisual\.com|raw\.githubusercontent\.com|\.gif\b/i.test(src))});
