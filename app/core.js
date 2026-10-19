/* Pure logic, shared with automated tests; no personal data leaves the browser. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.PausaCore=api;})(typeof window!=='undefined'?window:globalThis,function(){
 const VALID_INTERVALS=[25,30,45,60,90];
 const dateKey=(timestamp)=>{const d=new Date(timestamp);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
 const minutes=(seconds)=>Math.ceil(seconds/60);
 const formatClock=(seconds)=>{const s=Math.max(0,Math.floor(Number(seconds)||0));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`};
 const fromMinutes=(seconds)=>Math.round((Number(seconds)||0)/60);
 function validLog(log){return log&&typeof log==='object'&&typeof log.id==='string'&&typeof log.at==='number'&&Number.isFinite(log.at)&&log.at>0&&log.at<Date.now()+86400000&&typeof log.seconds==='number'&&Number.isFinite(log.seconds)&&log.seconds>=1&&log.seconds<=7200&&typeof log.name==='string'&&log.name.length<=100}
 function normalize(raw){const base={version:1,reminders:{enabled:false,interval:30,nextDueAt:0,pending:false},logs:[],safety:'unset',session:null};
  if(!raw||typeof raw!=='object')return base;
  const r=raw.reminders&&typeof raw.reminders==='object'?raw.reminders:{};
  base.reminders={enabled:r.enabled===true,interval:VALID_INTERVALS.includes(Number(r.interval))?Number(r.interval):30,nextDueAt:Number.isFinite(r.nextDueAt)?r.nextDueAt:0,pending:r.pending===true};
  if(base.reminders.enabled&&!base.reminders.nextDueAt)base.reminders.nextDueAt=Date.now()+base.reminders.interval*60000;
  base.logs=Array.isArray(raw.logs)?raw.logs.filter(validLog).slice(-1000):[];
  base.safety=['unset','ok','caution','urgent'].includes(raw.safety)?raw.safety:'unset';
  const s=raw.session;
  if(s&&typeof s==='object'&&typeof s.routineId==='string'&&Number.isInteger(s.index)&&s.index>=0&&s.index<20&&Number.isFinite(s.remaining)&&s.remaining>=0&&s.remaining<2000){base.session={routineId:s.routineId,index:s.index,remaining:s.remaining,paused:true,endAt:0,elapsedSeconds:Number.isFinite(s.elapsedSeconds)&&s.elapsedSeconds>=0?Math.min(7200,s.elapsedSeconds):0,beforePain:Number.isInteger(s.beforePain)&&s.beforePain>=0&&s.beforePain<=10?s.beforePain:null};}
  return base;
 }
 function dayLogs(logs,key){return logs.filter(l=>dateKey(l.at)===key)}
 function sumMinutes(logs){return Math.round(logs.reduce((n,l)=>n+l.seconds,0)/60)}
 function streak(logs,now=Date.now()){
  const days=new Set(logs.map(l=>dateKey(l.at)));const today=dateKey(now);let d=new Date(now);d.setHours(12,0,0,0);if(!days.has(today))d.setDate(d.getDate()-1);
  let count=0;while(count<1000&&days.has(dateKey(d.getTime()))){count++;d.setDate(d.getDate()-1)}return count;
 }
 function week(logs,now=Date.now()){
  const dates=[];const today=new Date(now);today.setHours(12,0,0,0);
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);const key=dateKey(d.getTime());dates.push({key,minutes:sumMinutes(dayLogs(logs,key)),label:new Intl.DateTimeFormat('es',{weekday:'short'}).format(d).replace('.','')});}return dates;
 }
 return {VALID_INTERVALS,dateKey,minutes,formatClock,fromMinutes,normalize,dayLogs,sumMinutes,streak,week};
});
