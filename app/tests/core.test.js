const assert=require('node:assert/strict');
const test=require('node:test');
const C=require('../core.js');
test('duraciones y reloj están normalizados',()=>{assert.equal(C.minutes(61),2);assert.equal(C.formatClock(125),'02:05');assert.equal(C.formatClock(-1),'00:00')});
test('normaliza datos corruptos y frecuencias no permitidas',()=>{const s=C.normalize({reminders:{enabled:true,interval:-5,nextDueAt:0},logs:[{garbage:1}],safety:'malo'});assert.equal(s.reminders.interval,30);assert.equal(s.logs.length,0);assert.equal(s.safety,'unset');assert.ok(s.reminders.nextDueAt>Date.now())});
test('agrupa movimientos por fecha local',()=>{const at=new Date(2026,9,16,12,0).getTime();const logs=[{id:'abc',name:'Pausa',at,seconds:120}];assert.equal(C.dayLogs(logs,C.dateKey(at)).length,1);assert.equal(C.sumMinutes(logs),2);assert.equal(C.week(logs,at).at(-1).minutes,2)});
test('rachas continuas consideran ayer si hoy aún no hay actividad',()=>{const now=new Date(2026,9,16,12).getTime();const yesterday=new Date(2026,9,15,12).getTime();const prev=new Date(2026,9,14,12).getTime();const log=x=>({id:String(x),name:'Pausa',at:x,seconds:60});assert.equal(C.streak([log(yesterday),log(prev)],now),2);assert.equal(C.streak([log(now),log(prev)],now),1)});
test('restaura una sesión de forma pausada',()=>{const s=C.normalize({session:{routineId:'express',index:1,remaining:17,paused:false}});assert.equal(s.session.paused,true);assert.equal(s.session.remaining,17)});
