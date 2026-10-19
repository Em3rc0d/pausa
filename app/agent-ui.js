/* Local generative composition with independent catalog and context validation. */
(function(){
 'use strict';
 const A=window.PausaAgentCore,P=window.PausaPlanner;
 let currentPlan=null,session=null,worker=null,reqId=0,request=null;
 let generation=0;
 let showAnimated=!(typeof window.matchMedia==='function'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const zoneList=Object.entries(A.LABELS);
 let draft={text:'',zone:'auto',mode:'model',fatigue:0,floor:false,position:'seated',avoidZones:[]};
 const recentSelections=[];const excludedMoves=new Set();
 function captureDraft(){const f=document.getElementById('agentForm');if(f)draft={text:f.querySelector('#agentDescribe').value,zone:f.querySelector('#agentZone').value,mode:f.querySelector('[name=agentMode]:checked').value,fatigue:Number(f.querySelector('#agentFatigue').value),floor:f.querySelector('#agentFloor').checked,position:f.querySelector('#agentPosition').value,avoidZones:[...f.querySelectorAll('[data-avoid-zone]:checked')].map(x=>x.value)};}
 function renderOutput(p){if(!p)return '';if(p.level==='ok')return resultHtml(p);return `<section class="agent-result agent-abstention" tabindex="-1"><div class="eyebrow">VAMOS PASO A PASO</div><h2>${p.level==='clarify'?'Necesito un dato más':p.level==='caution'||p.level==='urgent'?'Primero, una valoración':'No encuentro una pausa compatible'}</h2><p>${escHtml(p.message)}</p><button type="button" class="button secondary" data-nav="biblioteca">Explorar biblioteca</button>${p.suggestedZone?`<button type="button" class="button secondary" data-select-zone="${escHtml(p.suggestedZone)}">Confirmar ${escHtml(A.LABELS[p.suggestedZone])}</button>`:''}${excludedMoves.size?'<button type="button" class="button secondary" data-agent-action="reset-exclusions">Restablecer movimientos descartados</button>':''}</section>`;}
 function fatigueLabel(n){return n===0?'A gusto':n<=3?'Poco':n<=5?'Moderado':n<=7?'Bastante':'Mucho';}
 function durationLabel(seconds){const minutes=Math.floor(seconds/60),rest=seconds%60;return minutes?minutes+' min'+(rest?' '+rest+' s':''):seconds+' s';}
 const escHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function status(message,warning=false){const box=document.getElementById('agentStatus');if(box){box.textContent=message;box.classList.toggle('agent-error',warning);box.hidden=false;}}
 function render(){
  if(request)cancelGeneration();
  const safety=state.safety;
  const preview=LIBRARY.find(x=>x.id==='shoulder-backward-bilateral')||LIBRARY[0];
  return `<section class="page-head guide-heading"><div class="eyebrow">UNA PAUSA A TU MEDIDA · V1.11.0</div><h1>Un momento.<br><em>¿Cómo te sientes?</em></h1><p class="subheading">Una rutina breve de movilidad para hacer una pausa después de estar sentado.</p></section>
  <aside class="guide-general-notice" aria-label="Aviso antes de crear la rutina"><strong>Una propuesta general. Tú eliges cómo moverte.</strong><p>Esta guía no diagnostica ni trata el dolor. Si tienes un problema frecuente, persistente o que empeora, consulta a un profesional de salud. Decide qué movimientos realizar y detente si alguno aumenta tus molestias. Las ilustraciones están pendientes de revisión clínica.</p></aside>
  ${statusBanner()}
  <div class="agent-layout"><section class="panel agent-panel"><div class="guide-progress" aria-label="Describe cómo te sientes para elegir movimientos"><span class="active"><b>01</b> Cuéntanos</span><span><b>02</b> Elige tu pausa</span><span><b>03</b> Muévete</span></div>
  <form id="agentForm" class="agent-form">
  <div class="form-section-heading"><span class="form-number">01</span><div><h2>¿Dónde necesitas una pausa?</h2><p>Selecciona una zona o descríbelo con tus palabras.</p></div></div>
  <label class="sr-only" for="agentZone">Zona que quieres mover</label><select id="agentZone" class="zone-select" hidden><option value="auto" ${draft.zone==='auto'?'selected':''}>Detectar a partir de mi descripción</option>${zoneList.map(([z,l])=>`<option value="${z}" ${draft.zone===z?'selected':''}>${l}</option>`).join('')}</select>
  <div class="guide-zone-grid" role="group" aria-label="Zona que quieres mover">${zoneList.map(([z,l])=>`<button type="button" class="guide-zone ${draft.zone===z?'selected':''}" data-select-zone="${z}" aria-pressed="${draft.zone===z}"><span class="zone-symbol" aria-hidden="true">${zoneSymbol(z)}</span><span>${escHtml(l.replace(' / trapecios','').replace('Zona lumbar','Espalda baja'))}</span><span class="zone-check" aria-hidden="true">${icon('check',12)}</span></button>`).join('')}</div>
  <div class="describe-label"><label for="agentDescribe">Cuéntanos un poco más <span>opcional si eliges una zona</span></label>${draft.zone!=='auto'?'<button class="link-action" type="button" data-select-zone="auto">Detectar por descripción</button>':''}</div>
  <textarea id="agentDescribe" maxlength="600" rows="3" placeholder="Ej. Siento el cuello rígido después de varias horas frente a la pantalla.">${escHtml(draft.text)}</textarea>
  <fieldset class="guide-mode"><legend>¿Qué tipo de pausa quieres?</legend><label><input type="radio" name="agentMode" value="model" ${draft.mode==='model'?'checked':''}><span><b>Propuesta del modelo</b><small>La IA elige la cantidad y el orden según el objetivo y los movimientos disponibles.</small></span></label><label><input type="radio" name="agentMode" value="agile" ${draft.mode==='agile'?'checked':''}><span><b>Pausa ágil</b><small>Hasta 3 movimientos para una pausa corta. La IA elige cuáles y cuántos incluir.</small></span></label></fieldset>
  <div class="guide-intensity"><div class="form-section-heading"><span class="form-number">02</span><div><h2>¿Cuánto cansancio o rigidez notas?</h2><p>Piensa en cómo te sientes después de estar sentado.</p></div><span class="intensity-reading"><strong id="agentFatigueValue">${draft.fatigue}/10</strong><small id="agentFatigueLabel">${fatigueLabel(draft.fatigue)}</small></span></div>
  <label for="agentFatigue" class="sr-only">Cansancio o rigidez percibidos, de 0 a 10</label><input id="agentFatigue" type="range" min="0" max="10" value="${draft.fatigue}" step="1" style="--range-progress:${draft.fatigue*10}%" aria-describedby="fatigueScale fatigueHelp"><div class="range-labels" id="fatigueScale"><span>0 · Nada</span><span>10 · Mucho</span></div></div>
  <p id="fatigueHelp" class="subtext">Esta escala mide cansancio o rigidez, no dolor ni la intensidad del ejercicio.</p>
  <div id="agentFatigueNotice" class="agent-fatigue-inline" role="status" ${draft.fatigue<6?'hidden':''}>Los movimientos duran 20 segundos. La cantidad la elige el modelo según la modalidad; puedes detenerte cuando quieras.</div>

  <details class="agent-options"><summary>Ajustar a mi espacio y mis límites ${icon('settings',15)}</summary><div class="agent-options-body"><label for="agentPosition">¿Cómo quieres moverte?<select id="agentPosition"><option value="seated" ${draft.position==='seated'?'selected':''}>Permanecer sentado</option><option value="standing" ${draft.position==='standing'?'selected':''}>También puedo ponerme de pie</option></select></label><label class="agent-checkbox"><input type="checkbox" id="agentFloor" ${draft.floor?'checked':''}><span>También tengo una superficie cómoda para movimientos de suelo.</span></label><fieldset class="avoid-zones"><legend>Zonas que quiero evitar</legend>${zoneList.filter(([z])=>z!=='general').map(([z,l])=>`<label><input type="checkbox" data-avoid-zone value="${z}" ${draft.avoidZones.includes(z)?'checked':''}><span>${escHtml(l)}</span></label>`).join('')}</fieldset><p>Descarta cualquier movimiento que no te resulte cómodo. Las exclusiones se mantienen mientras tengas esta pestaña abierta.</p><div class="excluded-summary">${excludedMoves.size?`${excludedMoves.size} movimiento(s) descartado(s). <button type="button" class="link-action" data-agent-action="reset-exclusions">Restablecer</button>`:'Todavía no has descartado movimientos.'}</div></div></details>
  <div class="guide-safety-inline">${icon('shield',17)}<span>Rutina general de movilidad. <button type="button" class="link-action" data-action="safety">Ver precauciones</button></span></div>
  ${safety==='urgent'?'<div class="agent-preflight agent-danger">Has indicado señales de alarma. No hagas ejercicios; busca atención urgente.</div>':''}
  <div id="agentStatus" class="agent-status" role="status" tabindex="-1" hidden></div>
  <button class="button primary agent-submit" type="submit" id="agentGenerate" ${safety==='urgent'?'disabled':''}>Crear mi pausa ${icon('arrow',18)}</button><p class="guide-submit-note">Sin registro. Sin equipo. Con tiempo para ti.</p>
  </form></section>
  <aside class="agent-sidebar-info"><div class="guide-preview"><div class="guide-preview-label">UN PEQUEÑO CAMBIO DE RITMO</div><h2>Vuelve a ti.<br><em>Movimiento a movimiento.</em></h2><div class="guide-preview-image"><img src="${preview.poster}" width="640" height="640" alt="Ilustración de un movimiento suave de hombros"><span class="preview-bloom" aria-hidden="true">✳</span></div><div class="guide-preview-bottom">${icon('clock',17)} Pausas breves <span>·</span> A tu ritmo</div></div>
  <div class="agent-privacy">${icon('lock',19)}<span><b>Este espacio es tuyo.</b> Lo que escribes se interpreta en tu navegador y no se guarda.</span></div>
  <details class="guide-details"><summary>¿Cómo elegimos los movimientos? ${icon('info',15)}</summary><p>Una IA local compone la selección y el orden a partir de movimientos existentes. Comprobamos que respete tu objetivo, posición y exclusiones; las instrucciones y los tiempos proceden del catálogo. Si la propuesta no cumple estos límites, no la mostramos. En «Propuesta del modelo», la IA decide cuántos movimientos incluir, sin una cantidad fija de tres. «Pausa ágil» limita explícitamente la selección a tres como máximo. Los complementos lumbares son opcionales y muestran su zona real. Con mucho cansancio, acortamos cada movimiento, sin fijar el número de ejercicios. Una descripción habitual de dolor no impide crear la propuesta general. Las señales de alarma explícitas siguen un aviso aparte.</p><p>Las ilustraciones están pendientes de revisión clínica. Esta guía no diagnostica ni trata el dolor.</p></details></aside></div>
  <div id="agentOutput" aria-live="polite">${renderOutput(currentPlan)}</div>
  <div class="info-bar">${icon('shield',18)}<span>Muévete sin forzar. Si aparece dolor o te encuentras mal, detente. Las animaciones están pendientes de revisión clínica.</span></div>`;
 }
 function resultHtml(p){
  return `<section class="agent-result" tabindex="-1"><div class="agent-result-head"><div><div class="eyebrow">TU PAUSA ESTÁ LISTA</div><h2>${escHtml(p.title)}</h2><p>Movimientos breves · ${escHtml(A.LABELS[p.zone])}. Tú decides hasta dónde moverte.</p></div><div class="agent-time">${icon('clock',18)} ${durationLabel(p.seconds)}</div></div><p class="selection-summary"><strong>${p.mode==='agile'?'Pausa ágil · Hasta 3 movimientos':'Propuesta del modelo · Cantidad variable'}</strong><br>El modelo eligió ${p.items.length} movimiento${p.items.length===1?'':'s'} · Selección compuesta en tu dispositivo</p>${p.items.some(x=>x.role==='complement')?'<p class="selection-explanation">Incluye la zona elegida y complementos de movilidad. Cada tarjeta indica qué zona mueve.</p>':''}<div class="agent-result-grid" style="--exercise-count:${p.items.length}">${p.items.map((x,i)=>`<article class="agent-exercise"><div class="agent-exercise-figure"><img src="${escHtml(showAnimated?x.gif:x.poster)}" alt="Ilustración del movimiento ${escHtml(x.title)}" loading="lazy" decoding="async"><span>${String(i+1).padStart(2,'0')}</span></div><div class="agent-exercise-info"><p class="movement-role">${escHtml(x.roleLabel)}</p><h3>${escHtml(x.title.replace(' · bilateral','').replace(' · izquierda',' · lado izquierdo').replace(' · derecha',' · lado derecho'))}</h3><small>${x.seconds} segundos</small><p>${escHtml(x.steps)}</p><details class="movement-reason"><summary>¿Por qué este movimiento?</summary><p>${escHtml(x.why)}</p><p>La referencia orienta sobre movimientos generales; no valida esta ilustración ni su adecuación para ti.</p><a href="${escHtml(x.reference)}" target="_blank" rel="noopener noreferrer">Consultar referencia ${icon('arrow',12)}</a></details><button type="button" class="omit-movement" data-agent-action="exclude" data-movement-id="${escHtml(x.id)}">${icon('close',12)} Omitir y ajustar</button></div></article>`).join('')}</div><p class="agent-result-note">${escHtml(p.message)} Puedes detenerte o saltar un movimiento cuando quieras.</p><div class="agent-actions"><button type="button" class="button primary" data-agent-action="start">${icon('play',16)} Empezar rutina</button><button type="button" class="button secondary" data-agent-action="vary" ${p.canVary?'':'disabled'}>${icon('spark',16)} Otra combinación</button><button type="button" class="button secondary" data-agent-action="motion">${icon(showAnimated?'pause':'play',16)} ${showAnimated?'Mostrar pósteres':'Mostrar GIF'}</button></div></section>`
 }
 function fatigueNotice(){
  const input=document.getElementById('agentFatigue'),notice=document.getElementById('agentFatigueNotice');if(!input||!notice)return;
  notice.hidden=Number(input.value)<6;
  notice.textContent='Los movimientos duran 20 segundos. La cantidad la elige el modelo según la modalidad; puedes detenerte cuando quieras.';
 }
 function cancelGeneration(){
  generation++;const active=!!request;if(request){clearTimeout(request.timeout);request.reject(Error('cancelled'));request=null;}
  if(active){worker?.terminate();worker=null;}
  const btn=document.getElementById('agentGenerate');if(btn)btn.disabled=false;
  const cancel=document.getElementById('agentCancel');if(cancel)cancel.hidden=true;
 }
 function workerCompose(data,requireChange){return new Promise((resolve,reject)=>{
  if(typeof Worker!=='function'){reject(Error('unavailable'));return;}
  if(!worker){worker=new Worker('./agent-worker.js?v=1.11.0',{type:'module'});
   worker.onmessage=event=>{const d=event.data||{};if(!request||d.id!==request.id)return;clearTimeout(request.timeout);const r=request;request=null;if(d.type==='result')r.resolve({output:d.output,count:d.count});else{worker?.terminate();worker=null;r.reject(Error('unavailable'));}};
   worker.onerror=()=>{if(request){clearTimeout(request.timeout);request.reject(Error('unavailable'));request=null;}worker?.terminate();worker=null;};
  }
  const id=++reqId,timeout=setTimeout(()=>{if(request?.id===id){request=null;worker?.terminate();worker=null;reject(Error('timeout'));}},180000);
  request={id,resolve,reject,timeout};worker.postMessage({id,data,requireChange});
 })}
 async function generate({vary=false}={}){
  const form=document.getElementById('agentForm');if(!form)return;
  cancelGeneration();captureDraft();const token=generation;
  const snapshot=JSON.stringify(draft),safety=state.safety,oldPlan=currentPlan;
  const args={...draft,safety,library:LIBRARY,excludedIds:[...excludedMoves],recent:recentSelections};
  const prepared=A.prepare(args);
  const out=document.getElementById('agentOutput');
  if(prepared.level!=='ok'){currentPlan=prepared;if(out)out.innerHTML=renderOutput(prepared);if(prepared.level==='urgent')showUrgent();out?.querySelector('.agent-result')?.focus({preventScroll:true});return;}
  const conn=navigator.connection;
  if(conn&&(conn.saveData||['slow-2g','2g'].includes(conn.effectiveType))){status('La composición local no está disponible con el ahorro de datos activo o esta conexión. Puedes explorar la biblioteca.',true);return;}
  const data=P.payload(prepared,recentSelections),btn=document.getElementById('agentGenerate');
  if(!P.hasCombination(data,{requireChange:vary&&oldPlan?.canVary})){status('No encuentro una combinación que cubra tu objetivo con estos límites. Prueba con menos zonas o revisa la posición.',true);return;}
  btn.disabled=true;
  currentPlan=null;if(out)out.innerHTML='';
  status('Estamos componiendo una pausa para ti. Puedes cancelar en cualquier momento.');
  let cancel=document.getElementById('agentCancel');if(!cancel){cancel=document.createElement('button');cancel.id='agentCancel';cancel.type='button';cancel.className='button secondary';cancel.textContent='Cancelar';cancel.addEventListener('click',()=>{cancelGeneration();status('Composición cancelada. Puedes cambiar tu objetivo o volver a intentarlo.');});btn.after(cancel);}cancel.hidden=false;
  try{
   const proposal=await workerCompose(data,vary&&oldPlan?.canVary);
   if(!Number.isInteger(proposal.count))throw Error('invalid-count');
   if(token!==generation||!form.isConnected)return;
   captureDraft();if(snapshot!==JSON.stringify(draft)||safety!==state.safety){status('Cambiaste los datos. Crea una pausa nueva.',true);return;}
   const fresh=A.prepare({...args,safety:state.safety});
   if(fresh.level!=='ok'){currentPlan=fresh;}else{currentPlan=P.accept(fresh,data,proposal.output,{requireChange:vary&&oldPlan?.canVary,exactCount:proposal.count});}
   currentPlan.safetyProfile=safety;
   if(currentPlan.level==='ok'){recentSelections.push(currentPlan.items.map(x=>x.id));if(recentSelections.length>3)recentSelections.shift();}
   if(currentPlan.level!=='ok'&&vary&&oldPlan?.level==='ok'){currentPlan=oldPlan;status('No he conseguido otra combinación compatible. Conservamos tu pausa anterior.',true);}else{const box=document.getElementById('agentStatus');if(box)box.hidden=true;}
   if(out)out.innerHTML=renderOutput(currentPlan);
   out?.querySelector('.agent-result')?.focus({preventScroll:true});
  }catch(error){if(token!==generation)return;currentPlan=null;status('No he podido componer una pausa en este dispositivo. Puedes intentarlo de nuevo o explorar la biblioteca.',true);}
  finally{if(token===generation){btn.disabled=false;cancel.hidden=true;}}
 }
 function showSession(){
  if(!session||!currentPlan||currentPlan.level!=='ok')return;
  const p=currentPlan;const x=p.items[session.index];
  const remain=session.paused?session.remaining:Math.max(0,Math.ceil((session.endAt-Date.now())/1000));
  modal(`<div class="session-screen"><div class="session-head"><strong>Tu guía · ${escHtml(A.LABELS[p.zone])}</strong><span>Ejercicio ${session.index+1} de ${p.items.length}</span><button class="modal-close" data-action="agent-end" aria-label="Salir de la sesión">${icon('close',17)}</button></div><div class="session-progress"><span style="width:${session.index/p.items.length*100}%"></span></div><div class="session-pose agent-session-image"><img src="${escHtml(showAnimated?x.gif:x.poster)}" alt="Animación de ${escHtml(x.title)}" decoding="async"></div><h2 id="dialogTitle">${escHtml(x.title)}</h2><p class="session-description">Movimiento suave · ${escHtml(x.category)}</p><div class="session-clock" id="agentTimer" aria-label="Segundos restantes">${Core.formatClock(remain)}</div><p class="session-tip">${icon('info',14)} ${escHtml(x.steps)}</p><p class="agent-session-caution">Si aparece dolor, detente inmediatamente.</p><div class="session-buttons"><button class="button secondary" data-action="agent-pause">${icon(session.paused?'play':'pause',16)} ${session.paused?'Continuar':'Pausar'}</button><button class="button primary" data-action="agent-next">${session.index===p.items.length-1?'Finalizar':'Siguiente'} ${icon('arrow',15)}</button></div></div>`);
 }
 function finish(){
  if(!session||!currentPlan)return;
  const s=session;session=null;const elapsed=Math.max(0,Math.floor(s.elapsedSeconds));
  if(elapsed>=10){const log={id:`${Date.now()}-guiado`,routineId:'agent',name:currentPlan.title,seconds:Math.min(currentPlan.seconds,elapsed),at:Date.now(),beforePain:null,afterPain:null};state.logs.push(log);state.logs=state.logs.slice(-1000);persist();window.render();showFinished(log.id)}
  else {closeModal();window.render();notifyToast('Pausa finalizada','No se registró actividad porque se omitió la mayor parte del tiempo.')}
 }
 function next(){if(!session||!currentPlan)return;const s=session,p=currentPlan;const x=p.items[s.index];const remain=s.paused?s.remaining:Math.max(0,Math.ceil((s.endAt-Date.now())/1000));s.elapsedSeconds+=Math.max(0,x.seconds-remain);if(s.index+1>=p.items.length){finish();return}s.index++;s.remaining=p.items[s.index].seconds;s.paused=false;s.endAt=Date.now()+s.remaining*1000;showSession()}
 function pause(){if(!session)return;session.paused=!session.paused;if(session.paused){session.remaining=Math.max(0,Math.ceil((session.endAt-Date.now())/1000));session.endAt=0}else session.endAt=Date.now()+session.remaining*1000;showSession()}
 function end(){if(!session)return;session=null;closeModal();window.render();notifyToast('Pausa detenida','No se guardó la sesión incompleta.')}
 function start(){if(!currentPlan||currentPlan.level!=='ok')return;captureDraft();if(currentPlan.safetyProfile!==state.safety){status('Tus precauciones cambiaron. Crea una pausa nueva antes de empezar.',true);return;}const recheck=A.prepare({...draft,safety:state.safety,library:LIBRARY,excludedIds:[...excludedMoves]});if(recheck.level!=='ok'||recheck.mode!==currentPlan.mode||currentPlan.items.length>recheck.maxMovements||currentPlan.items.some(x=>!recheck.candidateIds.includes(x.id))){status('La selección ya no coincide con tus límites. Crea una pausa nueva.',true);return;}const guard=A.assess({safety:state.safety,fatigue:currentPlan.fatigue,text:currentPlan.inputText});if(guard.level!=='ok'){status(guard.message,true);return}if(state.session){notifyToast('Hay una rutina en curso','Termina la rutina anterior antes de comenzar otra.');return}if(session){showSession();return}session={index:0,remaining:currentPlan.items[0].seconds,paused:false,endAt:Date.now()+currentPlan.items[0].seconds*1000,elapsedSeconds:0};showSession()}
 function tick(){if(!session||session.paused)return;const left=Math.max(0,Math.ceil((session.endAt-Date.now())/1000));const count=document.getElementById('agentTimer');if(count)count.textContent=Core.formatClock(left);if(left<=0)next()}
 document.addEventListener('submit',ev=>{if(ev.target.id==='agentForm'){ev.preventDefault();generate()}});
 document.addEventListener('input',ev=>{
  if(['agentFatigue','agentZone','agentDescribe','agentFloor','agentPosition'].includes(ev.target.id)||ev.target.matches('[data-avoid-zone], [name=agentMode]')){if(request){cancelGeneration();status('Cambiaste los datos. Crea una pausa nueva.');}}
  if(['agentFatigue','agentZone','agentDescribe','agentFloor','agentPosition'].includes(ev.target.id)||ev.target.matches('[data-avoid-zone], [name=agentMode]'))captureDraft();
  if(ev.target.id==='agentFatigue'){
    const label=document.getElementById('agentFatigueValue');if(label)label.textContent=ev.target.value+'/10';document.getElementById('agentFatigueLabel').textContent=fatigueLabel(Number(ev.target.value));ev.target.style.setProperty('--range-progress',Number(ev.target.value)*10+'%');fatigueNotice();
  }
  if((['agentFatigue','agentZone','agentDescribe','agentFloor','agentPosition'].includes(ev.target.id)||ev.target.matches('[data-avoid-zone], [name=agentMode]'))&&currentPlan){
    currentPlan=null;const out=document.getElementById('agentOutput');if(out)out.innerHTML='';
    status('Cambiaste los datos. Pulsa «Crear mi pausa» para actualizar la selección.');
  }
 });
 document.addEventListener('click',ev=>{const b=ev.target.closest('[data-agent-action]');if(!b)return;ev.preventDefault();switch(b.dataset.agentAction){case 'start':start();break;case 'vary':generate({vary:true});break;case 'exclude':{if(!A.META.some(m=>m.id===b.dataset.movementId))return;excludedMoves.add(b.dataset.movementId);generate();break;}case 'reset-exclusions':{excludedMoves.clear();currentPlan=null;captureDraft();window.render();break;}case 'motion':{showAnimated=!showAnimated;const out=document.getElementById('agentOutput');if(out&&currentPlan)out.innerHTML=resultHtml(currentPlan);break;}}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&session&&!session.paused)pause()});
 window.addEventListener('storage',event=>{if(event.key==='pausa.local.v1'&&session){try{if(A.assess({safety:Core.normalize(JSON.parse(event.newValue||'null')).safety}).level!=='ok')end()}catch{end()}}});
 setInterval(tick,250);
 document.addEventListener('click',ev=>{
  const quick=ev.target.closest('[data-guide-zone]');
  if(quick){cancelGeneration();captureDraft();draft.zone=quick.dataset.guideZone;currentPlan=null;setPage('agente');return;}
  const zone=ev.target.closest('[data-select-zone]');
  if(zone){cancelGeneration();captureDraft();draft.zone=zone.dataset.selectZone;currentPlan=null;window.render();document.querySelector(`[data-select-zone="${draft.zone}"]`)?.focus({preventScroll:true});}
 });
 window.addEventListener('DOMContentLoaded',()=>{const target=location.hash.slice(1);if(['inicio','agente','rutinas','biblioteca','actividad','ajustes'].includes(target))setPage(target);});
 window.PausaAgentUI={render,start,pause,next,end,isSessionActive:()=>!!session};
})();
