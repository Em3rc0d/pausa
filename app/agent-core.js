/* Pausa Contextual: independent checks and catalog eligibility.
   This does not diagnose, treat, or establish clinical exercise suitability. */
(function(root,factory){const value=factory();if(typeof module==='object'&&module.exports)module.exports=value;root.PausaAgentCore=value})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const ZONES=['general','lumbar','cuello','hombros','manos','piernas'];
 const LABELS={general:'Cuerpo completo',lumbar:'Zona lumbar',cuello:'Cuello / trapecios',hombros:'Hombros',manos:'Manos y muñecas',piernas:'Piernas y cadera'};
 // These are movement IDs from the original 112 GIF library. This is a
 // conservative candidate allowlist, NOT a clinically validated exercise plan.
 // Catalog membership alone is not approval for automatic recommendation.
 const REFERENCES={sitting:'https://www.nhs.uk/live-well/exercise/sitting-exercises/',flexibility:'https://www.nhs.uk/live-well/exercise/flexibility-exercises/',general:'https://www.nhs.uk/live-well/exercise/strength-and-flex-exercise-plan-how-to-videos/',back:'https://www.guysandstthomas.nhs.uk/health-information/low-back-pain/physiotherapy-and-exercises',hands:'https://www.fhft.nhs.uk/patients-and-visitors/patient-information-library/hand-exercises-advice-sheet'};
 // GENERATED: movement targets/loads/position are engineering annotations,
 // not a clinical safety assessment or an endorsement by a source institution.
 const META=Object.freeze([
  ['shoulder-backward-bilateral',['hombros','cuello'],['hombros','cuello'],'shoulder-circle','upper',false,'general'],
  ['shoulder-forward-bilateral',['hombros'],['hombros','cuello'],'shoulder-circle','upper',false,'general'],
  ['shrug-bilateral',['hombros','cuello'],['hombros','cuello'],'shrug','upper',false,'general'],
  ['scapula-row-bilateral',['hombros'],['hombros','cuello'],'scapula','upper',false,'general'],
  ['neck-turn-bilateral',['cuello'],['cuello'],'neck-turn','upper',false,'sitting'],
  ['neck-side-bilateral',['cuello'],['cuello','hombros'],'neck-side','upper',false,'flexibility'],
  ['elbow-curl-bilateral',['hombros'],['manos','hombros'],'elbow','upper',false,'general'],
  ['forearm-turn-bilateral',['manos'],['manos','hombros'],'forearm','upper',true,'hands'],
  ['fingers-bilateral',['manos'],['manos'],'fingers','upper',true,'hands'],
  ['wrist-flex-bilateral',['manos'],['manos'],'wrist-bend','upper',true,'hands'],
  ['wrist-extend-bilateral',['manos'],['manos'],'wrist-bend','upper',true,'hands'],
  ['wrist-circle-bilateral',['manos'],['manos'],'wrist-circle','upper',true,'hands'],
  ['seated-march-bilateral',['piernas'],['piernas','lumbar'],'hip-march','seated',false,'sitting'],
  ['seated-knee-bilateral',['piernas'],['piernas','lumbar'],'knee','seated',false,'general'],
  ['seated-heels-bilateral',['piernas'],['piernas'],'ankle-pump','seated',true,'sitting'],
  ['seated-toes-bilateral',['piernas'],['piernas'],'ankle-pump','seated',true,'sitting'],
  ['ankle-circle-bilateral',['piernas'],['piernas'],'ankle-circle','seated',true,'sitting'],
  ['standing-heels-bilateral',['piernas'],['piernas','lumbar'],'ankle-pump','standing',false,'general'],
  ['standing-toes-bilateral',['piernas'],['piernas','lumbar'],'ankle-pump','standing',false,'general'],
  ['seated-side-bend-bilateral',['lumbar'],['lumbar','piernas'],'trunk-side','seated',false,'general'],
  ['seated-overhead-bilateral',['hombros'],['hombros','lumbar'],'overhead-reach','seated',false,'general'],
  ['standing-side-bend-bilateral',['lumbar'],['lumbar','piernas'],'trunk-side','standing',false,'flexibility'],
  ['pelvic-tilt',['lumbar'],['lumbar','piernas'],'pelvic','floor',false,'back'],
  ['knee-rolls',['lumbar'],['lumbar','piernas'],'lumbar-rotation','floor',false,'back'],
  ['cat-cow',['lumbar'],['lumbar','piernas','manos','hombros'],'spine','floor',false,'back']
 ].map(([id,targets,loads,family,position,comfort,reference])=>Object.freeze({id,targets:Object.freeze(targets),loads:Object.freeze(loads),family,position,comfort,reference,provenance:'generated',clinicalReview:'pending'})));
 const INSTRUCTIONS={
  'seated-march-bilateral':'Siéntate estable y alterna elevaciones suaves de los pies; respira normalmente.',
  'shoulder-backward-bilateral':'Haz círculos pequeños con ambos hombros hacia atrás sin levantar tensión.',
  'fingers-bilateral':'Abre y cierra las manos lentamente sin forzar los dedos.',
  'seated-heels-bilateral':'Apoya los dedos de los pies y eleva los talones suavemente.',
  'standing-heels-bilateral':'De pie junto a un apoyo estable, eleva los talones sin perder equilibrio.',
  'shrug-bilateral':'Sube y baja ambos hombros suavemente, soltando la tensión al bajar.',
  'scapula-row-bilateral':'Lleva ligeramente los codos atrás acercando los omóplatos, sin arquear la espalda.',
  'elbow-curl-bilateral':'Flexiona y extiende ambos codos a ritmo cómodo y sin carga.',
  'forearm-turn-bilateral':'Con codos cerca del cuerpo gira suavemente las palmas hacia arriba y abajo.',
  'wrist-circle-bilateral':'Dibuja círculos pequeños con las muñecas sin llevarlas a extremos dolorosos.',
  'wrist-flex-bilateral':'Flexiona y regresa las muñecas solo dentro del rango cómodo; evita forzar.',
  'seated-knee-bilateral':'Desde una silla estable, extiende una rodilla y alterna con la otra sin impulso.',
  'standing-toes-bilateral':'Junto a un apoyo estable eleva la punta de ambos pies sin desequilibrarte.',
  'pelvic-tilt':'En una superficie firme y cómoda, bascula la pelvis suavemente; evita forzar.',
  'cat-cow':'En cuatro apoyos, alterna curvaturas pequeñas y cómodas de la espalda.'
 };
 Object.assign(INSTRUCTIONS,{
  'shoulder-forward-bilateral':'Con los brazos relajados, dibuja círculos pequeños hacia delante sin forzar el cuello.',
  'neck-turn-bilateral':'Sentado, mira despacio a un lado y vuelve al centro. Alterna sin forzar ni empujar la cabeza.',
  'neck-side-bilateral':'Inclina ligeramente la cabeza hacia un lado y vuelve al centro; alterna sin tirar con las manos.',
  'wrist-extend-bilateral':'Apoya los antebrazos y lleva las manos suavemente hacia arriba; regresa sin forzar.',
  'seated-toes-bilateral':'En una silla estable, deja los talones apoyados y levanta un poco las puntas de los pies.',
  'ankle-circle-bilateral':'Sentado y estable, despega un pie lo mínimo necesario y dibuja círculos pequeños; alterna.',
  'seated-side-bend-bilateral':'En una silla estable, apoya ambos pies. Inclina el tronco un poco hacia un lado y vuelve al centro; alterna sin forzar ni buscar el máximo recorrido.',
  'seated-overhead-bilateral':'Sentado con ambos pies apoyados, eleva los brazos solo hasta donde resulte cómodo y vuelve a bajarlos, sin arquear la espalda.',
  'standing-side-bend-bilateral':'De pie con apoyo cercano, desliza una mano un poco por el costado sin buscar el máximo recorrido.',
  'knee-rolls':'Boca arriba con rodillas flexionadas, desplázalas un poco a un lado y vuelve al centro; alterna sin forzar.'
 });
 const DURATION= {'pelvic-tilt':30,'cat-cow':30,'knee-rolls':30,'wrist-flex-bilateral':20,'wrist-extend-bilateral':20,'neck-turn-bilateral':20,'neck-side-bilateral':20};
 // Red flags always override model intent. Conservative patterns intentionally
 // prefer false positive blocks to unsafe movement recommendations.
 const URGENT=/(?:p[eé]rdida|perd[ií]|incontinenci[ao]|no\s+controlo|no\s+puedo\s+controlar).{0,55}(?:orina|vejiga|esf[ií]nter|heces|intestin)|(?:adormec|sin\s+sensibilidad|entumec).{0,45}(?:genital|ingle|perine|entrepiern)|(?:debilidad|fuerza).{0,45}(?:progresiv|empeora\s+rápid)|(?:orina|vejiga|esf[ií]nter|heces|intestin).{0,55}(?:p[eé]rdida|perd[ií]|incontinenci[ao])|anestesia\s+en\s+silla/iu;
 const CAUTION=/(?:hormigueo|entumecimiento|adormecimiento|irradiad[oa]|ci[aá]tica|dolor\s+que\s+baja|dolor\s+que\s+se\s+extiende|fiebre|ca[ií]da\s+fuerte|accidente|golpe\s+fuerte|no\s+puedo\s+caminar|no\s+puedo\s+mover|lesi[oó]n|fractura|cirug[ií]a|operaci[oó]n\s+reciente|debilidad|cada\s+vez\s+peor)/iu;
 function assess({text='',fatigue=0,intensity,safety='unset'}={}){
  const safeText=String(text).slice(0,600),n=Number(fatigue);
  if(safety==='urgent'||URGENT.test(safeText))return {level:'urgent',message:'Describiste posibles señales de alarma. No hagas ejercicios; busca atención médica urgente.'};
  if(CAUTION.test(safeText))return {level:'caution',message:'Tus síntomas pueden requerir una valoración profesional. No generaremos una rutina automatizada para este caso; solicita orientación médica.'};

  if(intensity!==undefined)return {level:'clarify',code:'legacy-rating',message:'La guía ahora mide cansancio o rigidez. Vuelve a indicar esa sensación; no convertiremos una puntuación anterior de dolor.'};
  if(!Number.isFinite(n)||n<0||n>10)return {level:'clarify',message:'Selecciona cuánto cansancio o rigidez notas, entre 0 y 10.'};
  return {level:'ok',risk:'ordinary',message:'Rutina general de movilidad, no un tratamiento para tus síntomas. Tú decides qué movimientos realizar; detente si alguno duele o empeora cómo te sientes.'};
 }
 const ZONE_RULES=[['lumbar',/lumbar|espalda\s+baja|(?:parte|zona)\s+baja\s+de\s+(?:la\s+)?columna|columna\s+baja|cintura|lumbalgia/],['cuello',/cuello|cervical|nuca|trapec/],['hombros',/hombros?|om[oó]plat|esc[aá]pul|espalda\s+alta/],['manos',/mu[nñ]eca|dedos|manos|antebrazo|mouse|teclado/],['piernas',/piernas|rodillas|cadera|pantorrillas|tobillos|pies/]];
 function detectZones(text){return ZONE_RULES.filter(([,re])=>re.test(String(text||'').toLocaleLowerCase('es'))).map(([z])=>z)}
 function textAvoidZones(text){const zones=[];const re=/(?:evit(?:a|ar|o)|sin\s+mover|no\s+quiero\s+mover|no\s+mover|sin\s+apoyar)[^.!?;\n]{0,100}/giu;for(const clause of String(text).match(re)||[])zones.push(...detectZones(clause));return uniqueZones(zones);}
 function uniqueZones(values){return [...new Set((Array.isArray(values)?values:[]).filter(z=>ZONES.includes(z)&&z!=='general'))]}
 function prepare({text='',zone='auto',fatigue=0,intensity,floor=false,safety='unset',library=[],position='seated',avoidZones=[],excludedIds=[],mode='model'}={}){
  text=String(text||'').slice(0,600);
  const guard=assess({text,fatigue,intensity,safety});if(guard.level!=='ok')return {...guard,items:[]};
  const fail=(level,code,message)=>({level,code,message,items:[]});
  if(!['model','agile'].includes(mode))return fail('clarify','mode','Elige Propuesta del modelo o Pausa ágil.');
  if(!['seated','standing'].includes(position))return fail('clarify','position','Elige si quieres permanecer sentado o si también puedes ponerte de pie.');
  const mentioned=detectZones(text),manual=ZONES.includes(zone);
  const avoided=uniqueZones([...uniqueZones(avoidZones),...textAvoidZones(text)]);
  const described=mentioned.filter(z=>!avoided.includes(z));
  const targets=manual&&zone!=='general'?[zone]:described.length?described:['general'];
  if(targets.every(z=>z!=='general'&&avoided.includes(z)))return fail('unavailable','target-avoided','La zona elegida también está marcada como zona a evitar. Revisa tu objetivo o tus límites.');
  const byId=new Map(library.map(x=>[x.id,x])),excluded=new Set(Array.isArray(excludedIds)?excludedIds:[]);
  const eligible=META.filter(m=>byId.has(m.id)&&!excluded.has(m.id))
   .filter(m=>!m.loads.some(z=>avoided.includes(z)))
   .filter(m=>m.position==='upper'||m.position==='seated'||m.position==='standing'&&position==='standing'||m.position==='floor'&&floor);
  const direct=eligible.filter(m=>targets.includes('general')||m.targets.some(z=>targets.includes(z)));
  // Explicit product-level complements, preserving actual body-region metadata.
  // They never replace missing direct target coverage or override exclusions.
  const maxComplements=targets.length===1&&targets[0]==='lumbar'?2:0;
  const complementIds=['seated-march-bilateral','seated-knee-bilateral','seated-overhead-bilateral'];
  const candidates=eligible.filter(m=>direct.includes(m)||maxComplements&&complementIds.includes(m.id));
  if(!candidates.length)return fail('unavailable','no-candidates',targets.includes('lumbar')&&!floor&&position==='seated'?'No tengo movimientos lumbares anotados para hacer solo en la silla. No sustituiré tu objetivo por manos o tobillos. Puedes revisar la posición si te resulta cómoda o pedir orientación profesional.':'No hay movimientos compatibles con tu objetivo, posición y exclusiones. No añadiré ejercicios de otras zonas para rellenar.');
  if(targets.some(z=>z!=='general'&&!direct.some(m=>m.targets.includes(z))))return fail('unavailable','missing-target','El catálogo actual no tiene un movimiento directo disponible para cada zona solicitada con esta posición y exclusiones. No sustituiré tu objetivo por complementos.');
  const candidateItems=candidates.map(m=>{const x=byId.get(m.id),setting=m.position==='floor'?'En superficie cómoda':m.position==='standing'?'De pie junto a un apoyo':'Puedes permanecer sentado';
   const complementary=!direct.includes(m),regions=m.targets.map(z=>LABELS[z]).join(' / ');
   return {id:m.id,title:x.title,category:x.category,gif:x.gif,poster:x.poster,seconds:Number(fatigue)>=6?20:(DURATION[m.id]||30),steps:INSTRUCTIONS[m.id],review:x.clinical_review||'pending',role:complementary?'complement':'focus',complementFor:complementary?['lumbar']:[],roleLabel:complementary?'Complemento · '+regions:targets.includes('general')?regions:'Zona elegida · '+regions,why:complementary?'Complementa la pausa con movilidad de '+regions+'. No es un ejercicio lumbar. '+setting+'.':(targets.includes('general')?'Incluye movimiento de ': 'Coincide con ')+m.targets.filter(z=>targets.includes('general')||targets.includes(z)).map(z=>LABELS[z]).join(' / ')+'. '+setting+'.',targets:m.targets,loads:m.loads,family:m.family,position:m.position,reference:REFERENCES[m.reference],annotationProvenance:m.provenance};});
  return {level:'ok',risk:guard.risk,fatigue:Number(fatigue),mode,maxMovements:Math.min(mode==='agile'?3:Infinity,new Set(candidates.map(m=>m.family)).size),maxComplements,inputText:text,zone:targets[0],context:{targets,blocked:avoided,position,floor,mode,excludedIds:[...excluded]},title:'Tu pausa · '+targets.map(z=>LABELS[z]).join(' y '),message:guard.message,items:[],source:'candidate-pool',candidateCount:candidates.length,candidateIds:candidates.map(m=>m.id),candidateItems};
 }
 return {ZONES,LABELS,META,REFERENCES,assess,prepare,detectZones,textAvoidZones};
});
