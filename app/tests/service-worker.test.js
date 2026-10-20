'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
function harness(){
 const events={},stores=new Map(),clients=[],opened=[],cacheFiles=[];
 const normalize=(request,{ignoreSearch=false}={})=>{
  const raw=typeof request==='string'?request:request.url;
  const url=new URL(raw,'https://pausa.test/');
  if(ignoreSearch)url.search='';
  return url.href;
 };
 const store=name=>{if(!stores.has(name))stores.set(name,new Map());return stores.get(name)};
 const cacheStorage={
  open:async name=>({
   addAll:async urls=>{for(const url of urls){cacheFiles.push(url);store(name).set(normalize(url),{ok:true,source:'install'})}},
   match:async(request,options)=>store(name).get(normalize(request,options)),
   put:async(request,response)=>{store(name).set(normalize(request),response)}
  }),
  keys:async()=>[...stores.keys()],
  delete:async name=>stores.delete(name),
  match:async(request,options)=>{for(const saved of stores.values()){const response=saved.get(normalize(request,options));if(response)return response}return undefined}
 };
 const worker={location:{origin:'https://pausa.test'},clients:{
  matchAll:async()=>clients,openWindow:async url=>{opened.push(url)}
 },addEventListener:(kind,cb)=>{events[kind]=cb},skipWaiting:async()=>{},};
 let online=true;
 const sandbox={self:worker,caches:cacheStorage,URL,fetch:async request=>{
  if(!online)throw Error('offline');
  return {ok:true,source:'network',clone(){return {...this}}}
 }};
 vm.runInNewContext(code,sandbox,{filename:'sw.js'});
 const fire=async(kind,payload)=>{
  let done;
  const event={...payload,waitUntil(promise){done=promise},respondWith(promise){done=promise}};
  events[kind](event);
  return done;
 };
 return {events,cacheStorage,cacheFiles,clients,opened,fire,setOnline:v=>online=v};
}
test('instala shell, assets HQ y permite fallback offline de GIF ya precargados',async()=>{
 const h=harness();
 await h.fire('install');
 for(const part of ['090-seated-overhead-bilateral.gif','081-seated-heels-bilateral.gif','087-seated-side-bend-bilateral.gif']){
  assert.ok(h.cacheFiles.some(x=>x.includes(part)),part);
 }
 h.setOnline(false);
 const req={method:'GET',url:'https://pausa.test/assets/fullbody/gifs/090-seated-overhead-bilateral.gif'};
 const response=await h.fire('fetch',{request:req});
 assert.equal(response.source,'install','el GIF HQ precargado debe funcionar sin red');
});
test('el clic de notificación enfoca una pestaña y comunica que abra Inicio',async()=>{
 const h=harness(),messages=[];
 let focused=0;
 h.clients.push({url:'https://pausa.test/#ajustes',focus:async()=>{focused++},postMessage:value=>messages.push(value)});
 let closed=0;
 await h.fire('notificationclick',{notification:{close:()=>{closed++}}});
 assert.equal(closed,1);assert.equal(focused,1);
 assert.equal(messages[0].type,'pausa-reminder-open');
 assert.equal(h.opened.length,0);
});
test('el clic sin pestañas abiertas solicita abrir Inicio',async()=>{
 const h=harness();
 await h.fire('notificationclick',{notification:{close(){}}});
 assert.deepEqual(h.opened,['./#inicio']);
});

test('el HTML y los scripts de la instalación quedan accesibles sin conexión',async()=>{
 const h=harness();
 await h.fire('install');
 h.setOnline(false);
 for(const asset of ['index.html','app.js']){
  const req={method:'GET',url:'https://pausa.test/'+asset,mode:asset==='index.html'?'navigate':'same-origin'};
  const reply=await h.fire('fetch',{request:req});
  assert.equal(reply.source,'install',asset+' debe servirse desde el shell local');
 }
});

test('los recursos con versión usan ignoreSearch solo cuando se solicita',async()=>{
 const h=harness();
 await h.fire('install');
 const req={method:'GET',url:'https://pausa.test/app.js?v=1.12.0',mode:'same-origin'};
 assert.equal(await h.cacheStorage.match(req),undefined,'una consulta normal preserva el query');
 assert.equal((await h.cacheStorage.match(req,{ignoreSearch:true})).source,'install');
 h.setOnline(false);
 assert.equal((await h.fire('fetch',{request:req})).source,'install','el JS versionado tiene fallback offline');
});
test('los scripts precargados siguen network-first si hay conexión',async()=>{
 const h=harness();
 await h.fire('install');
 const req={method:'GET',url:'https://pausa.test/app.js?v=1.12.0',mode:'same-origin'};
 assert.equal((await h.fire('fetch',{request:req})).source,'network');
});
