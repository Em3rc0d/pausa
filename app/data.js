/* Curated original Spanish guidance. See README.md for evidence, exclusions and clinical limitations. */
const EXERCISES = Object.freeze({
  walk: {id:'walk',name:'Camina un poco',subtitle:'Activa tu circulación',zone:'Cuerpo completo',place:'De pie',seconds:60,effort:'Suave',art:'walk',
    steps:['Levántate y camina por tu habitación o pasillo.','Mueve los brazos con naturalidad y respira con calma.','Mantén un ritmo cómodo, sin apresurarte.'],tip:'Dar unos pasos ya cuenta. No hace falta hacerlo perfecto.'},
  shoulders: {id:'shoulders',name:'Círculos de hombros',subtitle:'Libera la tensión de pantalla',zone:'Cuello y hombros',place:'Sentado o de pie',seconds:45,effort:'Suave',art:'shoulders',
    steps:['Relaja los brazos a los lados.','Eleva suavemente los hombros y dibuja círculos hacia atrás.','Cambia el sentido a mitad del tiempo.'],tip:'Evita elevar los hombros hasta provocar dolor.'},
  pelvisChair: {id:'pelvisChair',name:'Movilidad de pelvis',subtitle:'Un cambio suave de postura',zone:'Zona lumbar',place:'En tu silla',seconds:50,effort:'Suave',art:'seated',
    steps:['Siéntate con los pies apoyados y espacio para moverte.','Inclina suavemente la pelvis hacia delante y hacia atrás.','Hazlo despacio y sin llegar al dolor.'],tip:'El movimiento debe ser pequeño y confortable.'},
  torso: {id:'torso',name:'Giro torácico suave',subtitle:'Movimiento de espalda alta',zone:'Espalda alta',place:'Sentado',seconds:50,effort:'Suave',art:'twist',
    steps:['Siéntate erguido con ambos pies en el suelo.','Cruza los brazos sobre el pecho.','Gira el tronco ligeramente a un lado y luego al otro.'],tip:'No fuerces el giro ni uses la silla como palanca.'},
  shift: {id:'shift',name:'Cambio de peso',subtitle:'Despierta las piernas',zone:'Cadera y piernas',place:'De pie',seconds:45,effort:'Suave',art:'shift',
    steps:['Ponte de pie cerca de una mesa estable.','Lleva poco a poco el peso de un pie al otro.','Mantén las rodillas relajadas, sin inclinar el tronco.'],tip:'Apóyate en la mesa si necesitas equilibrio.'},
  pelvicFloor: {id:'pelvicFloor',name:'Basculación pélvica',subtitle:'Movilidad lumbar en el suelo',zone:'Zona lumbar',place:'En colchoneta',seconds:60,effort:'Suave',art:'floor',
    steps:['Acuéstate boca arriba, con rodillas flexionadas y pies apoyados.','Activa suavemente el abdomen para acercar la zona lumbar al suelo.','Relaja y repite a ritmo lento.'],tip:'No contengas la respiración.'},
  catCow: {id:'catCow',name:'Gato-vaca',subtitle:'Mueve tu columna con control',zone:'Espalda',place:'En colchoneta',seconds:70,effort:'Suave',art:'quadruped',
    steps:['Coloca manos debajo de hombros y rodillas debajo de caderas.','Redondea suavemente la espalda mientras exhalas.','Regresa a una posición cómoda; evita arquear en exceso.'],tip:'Busca movilidad, no el máximo rango.'},
  knees: {id:'knees',name:'Rodillas a los lados',subtitle:'Rotación lumbar relajada',zone:'Zona lumbar',place:'En colchoneta',seconds:60,effort:'Suave',art:'knees',
    steps:['Acuéstate boca arriba, con rodillas flexionadas y juntas.','Déjalas caer un poco hacia un lado mientras mantienes los hombros apoyados.','Vuelve al centro y alterna, sin forzar.'],tip:'Reduce el movimiento si aparece molestia.'},
  bridge: {id:'bridge',name:'Puente de glúteos',subtitle:'Activa glúteos y cadera',zone:'Glúteos',place:'En colchoneta',seconds:65,effort:'Moderado',art:'bridge',
    steps:['Acuéstate boca arriba, rodillas flexionadas y pies apoyados.','Aprieta suavemente los glúteos y eleva un poco la pelvis.','Baja lentamente, sin arquear la zona lumbar.'],tip:'Para si aumenta el dolor o aparece irradiación.'},
  birdDog: {id:'birdDog',name:'Bird dog adaptado',subtitle:'Estabilidad sin prisas',zone:'Zona media',place:'En colchoneta',seconds:70,effort:'Moderado',art:'birddog',
    steps:['Coloca manos y rodillas sobre una superficie cómoda.','Extiende lentamente una pierna sin inclinar la pelvis.','Si te resulta fácil, añade el brazo contrario; cambia de lado.'],tip:'Puedes mover solo una pierna o un brazo.'},
  sitStand: {id:'sitStand',name:'Sentarse y levantarse',subtitle:'Fuerza útil para tu día',zone:'Piernas y cadera',place:'Con silla estable',seconds:65,effort:'Moderado',art:'sitstand',
    steps:['Usa una silla firme que no se deslice.','Lleva ligeramente el tronco hacia delante y levántate sin impulsos bruscos.','Vuelve a sentarte despacio. Usa apoyos si hace falta.'],tip:'No continúes si la espalda duele más.'}
});
const ROUTINES = Object.freeze([
  {id:'express',name:'Pausa express',badge:'Para empezar',category:'escritorio',tone:'mint',description:'Sal de la silla y recarga energía sin romper tu concentración.',ids:['walk','shoulders','pelvisChair','shift'],total:200,level:'Muy suave',icon:'spark'},
  {id:'seated',name:'Pausa sentado',badge:'Sin levantarte',category:'escritorio',tone:'mint',description:'Tres movimientos breves para hacer sentado sin descargar IA.',ids:['shoulders','pelvisChair','torso'],total:145,level:'Muy suave',icon:'coffee'},
  {id:'desk',name:'Reset de escritorio',badge:'Sin colchoneta',category:'escritorio',tone:'peach',description:'Movimientos amables para cuello, espalda y cadera.',ids:['shoulders','torso','pelvisChair','walk','shift'],total:250,level:'Muy suave',icon:'sun'},
  {id:'lumbar',name:'Movilidad lumbar',badge:'Para después del trabajo',category:'movilidad',tone:'lavender',description:'Secuencia tranquila para recuperar movilidad y explorar qué te sienta bien.',ids:['pelvicFloor','catCow','knees','walk'],total:250,level:'Suave',icon:'wave'},
  {id:'strength',name:'Espalda y cadera',badge:'Fortalecimiento suave',category:'fuerza',tone:'yellow',description:'Trabajo gradual de glúteos, piernas y control del tronco.',ids:['pelvicFloor','bridge','birdDog','sitStand','walk'],total:320,level:'Adaptable',icon:'strength'}
]);
const ICONS = {
 book:'<path d="M3 5a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2z"/><path d="M21 5a2 2 0 0 0-2-2h-2a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h2a2 2 0 0 1 2 2z"/>' ,
 zoom:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M11 8v6m-3-3h6"/>',
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
 activity:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
 chart:'<path d="M4 20V11M10 20V5M16 20v-9M22 20v-6"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 play:'<path d="m8 5 11 7-11 7z"/>',
 pause:'<path d="M8 5v14M16 5v14"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 close:'<path d="M5 5 19 19M19 5 5 19"/>',
 chevron:'<path d="m9 18 6-6-6-6"/>',
 refresh:'<path d="M20 11a8 8 0 0 0-14-5L3 9m0-5v5h5M4 13a8 8 0 0 0 14 5l3-3m0 5v-5h-5"/>',
 warning:'<path d="m12 3 10 18H2z"/><path d="M12 9v5m0 4h.01"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',
 trash:'<path d="M4 7h16M10 4h4M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
 shield:'<path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
 coffee:'<path d="M4 8h12v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h2a3 3 0 1 1 0 6h-2M4 3v2M10 3v2"/>',
 spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4m-11.4 11.4-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9"/>',
 wave:'<path d="M2 14c4-8 8-8 12 0s8 8 8 0"/>',
 strength:'<path d="M3 9v6m4-9v12m10-12v12m4-9v6M7 12h10"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M7 3v4m10-4v4"/>',
 stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
 external:'<path d="M14 4h6v6M20 4l-9 9M20 14v6H4V4h6"/>'
};
function icon(name,size=20){return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.spark}</svg>`}
function drawPose(pose){
 const line=(d)=>`<path d="${d}"/>`,circle=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
 let p='';
 if(['walk','shoulders','shift','sitstand'].includes(pose)){
  p=circle(149,55,14)+line('M149 69 148 132 M148 85 120 110 M148 87 178 110 M148 132 123 184 M148 132 174 181');
  if(pose==='walk')p=circle(149,55,14)+line('M149 69 149 132 M149 85 121 111 M149 88 176 108 M149 132 114 179 M149 132 175 170 M109 190h22 M162 179h23');
  if(pose==='shoulders')p+=line('M110 77C90 67 89 106 111 109 M187 77c20-10 21 29-1 32 M105 78l5-6m-5 6 9-1 M193 79l-7-5m7 5-9 2');
  if(pose==='shift')p+=line('M106 191h80 M113 178v12 M184 177v13');
  if(pose==='sitstand')p+=line('M191 125v56 M190 159h-45 M190 183h21 M141 159v24');
 }else if(['seated','twist'].includes(pose)){
  p=line('M113 155h89 M120 155v42 M194 155v42 M120 197h-16 M194 197h18')+circle(146,58,14)+line('M146 73 148 123 181 146 189 185 M148 123 121 150 114 185 M145 90 127 116 M146 93 175 113');
  if(pose==='twist')p+=line('M100 102c-13-20 12-40 33-37m-26 3 26-3-6-17');
 }else if(pose==='floor'||pose==='knees'||pose==='bridge'){
  p=line('M55 190h201');
  if(pose==='bridge')p+=circle(84,150,13)+line('M97 150 145 124 202 139 229 188 M203 140 193 188 M103 152 90 185');
  else if(pose==='knees')p+=circle(81,166,13)+line('M94 168 166 168 198 133 231 157 M198 133 215 188 M110 169 103 185');
  else p+=circle(84,166,13)+line('M97 166 173 166 202 126 234 187 M202 126 193 187 M110 166 101 186');
 }else if(pose==='quadruped'||pose==='birddog'){
  p=line('M60 192h194')+circle(100,109,13);
  if(pose==='quadruped')p+=line('M114 111 185 112 Q197 111 201 123 L207 184 M154 113 149 183 M116 116 112 181 M209 185h15 M141 185h17');
  else p+=line('M114 113 173 115 224 102 M153 117 149 182 M113 116 79 69 M150 184h19 M221 102 241 104');
 }
 return `<svg class="pose-svg" viewBox="0 0 300 230" role="img" aria-label="Ilustración esquemática del movimiento"><ellipse cx="150" cy="205" rx="100" ry="8" fill="currentColor" opacity=".07"/><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${p}</g><circle cx="245" cy="55" r="29" fill="currentColor" opacity=".08"/><path d="M235 55h20m-10-10v20" stroke="currentColor" stroke-width="3" opacity=".4" stroke-linecap="round"/></svg>`;
}
