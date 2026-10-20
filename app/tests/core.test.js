const assert=require('node:assert/strict');
const test=require('node:test');
const C=require('../core.js');
test('duraciones y reloj están normalizados',()=>{assert.equal(C.minutes(61),2);assert.equal(C.formatClock(125),'02:05');assert.equal(C.formatClock(-1),'00:00')});
test('normaliza datos corruptos y frecuencias no permitidas',()=>{const s=C.normalize({reminders:{enabled:true,interval:-5,nextDueAt:0},logs:[{garbage:1}],safety:'malo'});assert.equal(s.reminders.interval,30);assert.equal(s.logs.length,0);assert.equal(s.safety,'unset');assert.ok(s.reminders.nextDueAt>Date.now())});
test('agrupa movimientos por fecha local',()=>{const at=new Date(2026,9,16,12,0).getTime();const logs=[{id:'abc',name:'Pausa',at,seconds:120}];assert.equal(C.dayLogs(logs,C.dateKey(at)).length,1);assert.equal(C.sumMinutes(logs),2);assert.equal(C.week(logs,at).at(-1).minutes,2)});
test('rachas continuas consideran ayer si hoy aún no hay actividad',()=>{const now=new Date(2026,9,16,12).getTime();const yesterday=new Date(2026,9,15,12).getTime();const prev=new Date(2026,9,14,12).getTime();const log=x=>({id:String(x),name:'Pausa',at:x,seconds:60});assert.equal(C.streak([log(yesterday),log(prev)],now),2);assert.equal(C.streak([log(now),log(prev)],now),1)});
test('restaura una sesión de forma pausada',()=>{const s=C.normalize({session:{routineId:'express',index:1,remaining:17,paused:false}});assert.equal(s.session.paused,true);assert.equal(s.session.remaining,17)});

test('la agenda mantiene compatibilidad y valida el reloj',()=>{
 const a=C.normalize({reminders:{enabled:true,interval:30}});assert.equal(a.reminders.scheduleEnabled,false);
 const b=C.normalize({reminders:{scheduleEnabled:true,start:'99:99',end:'18:00'}});assert.equal(b.reminders.start,'09:00');
});
test('la agenda evita el domingo y abre el lunes a las 09:00',()=>{
 const r={scheduleEnabled:true,start:'09:00',end:'18:00',weekdaysOnly:true};
 const d=new Date(C.nextAllowedReminder(new Date(2026,9,18,11).getTime(),r));
 assert.equal(d.getDay(),1);assert.equal(d.getHours(),9);assert.equal(d.getMinutes(),0);
});

test('el tiempo transcurrido se presenta exactamente y no se redondea contradictoriamente',()=>{
 const ts=new Date(2026,9,19,12).getTime();
 const logs=[{id:'uno',at:ts,name:'Pausa sentado',seconds:145}];
 assert.equal(C.sumSeconds(logs),145);
 assert.deepEqual(C.elapsedParts(145),{value:2,unit:'min 25 s'});
 assert.equal(C.formatElapsed(logs[0].seconds),'2 min 25 s');
 assert.equal(C.formatElapsed(C.sumSeconds(logs)),'2 min 25 s');
 assert.equal(C.week(logs,ts).at(-1).seconds,145);
 assert.equal(C.formatElapsed(12),'12 s');
 assert.equal(C.formatElapsed(3605),'1 h 5 s');
 assert.equal(C.formatElapsed(0),'0 min');
});

test('instalación limpia inicia con horas válidas y una ventana desactivada',()=>{
 const fresh=C.normalize(null);
 assert.deepEqual(fresh.reminders,{enabled:false,interval:30,nextDueAt:0,pending:false,scheduleEnabled:false,start:'09:00',end:'18:00',weekdaysOnly:true});
 const invalid=C.normalize({reminders:{enabled:true,interval:25,start:'21:00',end:'09:00',scheduleEnabled:true}});
 assert.equal(invalid.reminders.start,'09:00');
 assert.equal(invalid.reminders.end,'18:00');
 assert.equal(invalid.reminders.scheduleEnabled,true);
});

test('el aviso del intervalo no promete un recordatorio inmediato fuera del horario',()=>{
 assert.equal(C.reminderFrequencyFeedback({enabled:true,interval:30,scheduleEnabled:true}),'Cada 30 minutos dentro de tu horario permitido, mientras Pausa esté abierta.');
 assert.equal(C.reminderFrequencyFeedback({enabled:true,interval:45,scheduleEnabled:false}),'Cada 45 minutos mientras Pausa esté abierta.');
 assert.equal(C.reminderFrequencyFeedback({enabled:false,interval:60,scheduleEnabled:true}),'Intervalo de 60 minutos guardado. Los recordatorios siguen desactivados.');
 assert.equal(C.reminderFrequencyFeedback({enabled:true,interval:900,scheduleEnabled:false}),'Cada 30 minutos mientras Pausa esté abierta.');
});
