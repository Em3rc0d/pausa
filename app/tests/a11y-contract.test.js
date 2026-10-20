'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const source=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
const luminance=hex=>{
 const hex6=hex.replace('#','');
 const rgb=[0,2,4].map(i=>parseInt(hex6.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
 return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
};
const ratio=(fg,bg)=>{
 const [hi,lo]=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);
 return (hi+0.05)/(lo+0.05);
};
test('la navegación cuenta con salto, main enfocable y estado de ruta accesible',()=>{
 const html=source('index.html'),app=source('app.js');
 assert.match(html,/<a class="skip-link" href="#appContent">Saltar al contenido<\/a>/);
 assert.match(html,/<main id="appContent"[^>]*tabindex="-1"/);
 assert.match(html,/<nav[^>]*aria-label="Navegación móvil"/);
 assert.match(app,/setAttribute\('aria-current','page'\)/);
 assert.match(app,/aria-modal="true" aria-labelledby="dialogTitle"/);
});
test('las escalas opcionales conservan la asociación accesible entre título y radios',()=>{
 const app=source('app.js');
 assert.match(app,/<fieldset class="setting-group checkin-group"><legend>Opcional: ¿cómo sientes la zona lumbar/);
 assert.match(app,/<fieldset class="setting-group checkin-group"><legend>Opcional: ¿cómo sientes la espalda después/);
 assert.match(app,/<\/fieldset>/);
 assert.match(app,/name="beforePain" type="radio"/);
 assert.match(app,/name="afterPain" type="radio"/);
});
test('los colores de texto secundarios clave alcanzan contraste 4.5:1 sobre superficies claras',()=>{
 const css=source('styles.css');
 assert.match(css,/:root\{--muted:#52644a\}/);
 assert.match(css,/\.setting-note,\.settings-row small,\.modal-head p,\.checkin-scale span,\.checkin-caption,\.finished-copy\{/);
 assert.match(css,/color:#536b62;/);
 for(const fg of ['#52644a','#536b62']){
  for(const bg of ['#ffffff','#f7f8f4','#f0f5ee']){
   assert.ok(ratio(fg,bg)>=4.5,fg+' sobre '+bg+' tiene contraste '+ratio(fg,bg).toFixed(2));
  }
 }
});
