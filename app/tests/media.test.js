const test=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,statSync}=require('node:fs');
const {join}=require('node:path');
const root=join(__dirname,'..');
const keys=['walk','shoulders','pelvisChair','torso','shift','pelvicFloor','catCow','knees','bridge','birdDog','sitStand'];
test('Cada ejercicio cuenta con PNG y GIF originales locales',()=>{
 for(const id of keys){const png=readFileSync(join(root,'assets','exercises',`${id}.png`));const gif=readFileSync(join(root,'assets','exercises',`${id}.gif`));
 assert.deepEqual(Array.from(png.subarray(0,8)),[137,80,78,71,13,10,26,10]);
 assert.equal(gif.toString('ascii',0,6),'GIF89a');
 assert.ok(statSync(join(root,'assets','exercises',`${id}.gif`)).size>1000);
 }
});
test('Animaciones se precargan para funcionamiento sin conexión',()=>{
 const sw=readFileSync(join(root,'sw.js'),'utf8');assert.match(sw,/assets\/exercises/);assert.match(sw,/gif/);
});
test('El usuario puede detener las animaciones',()=>{
 const app=readFileSync(join(root,'app.js'),'utf8');assert.match(app,/toggle-media/);assert.match(app,/prefers-reduced-motion/);
});
