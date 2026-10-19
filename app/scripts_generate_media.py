"""Original SVG/Pillow exercise artwork for Pausa. Dependencies: cairosvg, pillow.
Copyright (c) 2026 Pausa contributors. MIT licensed (see LICENSE).
These diagrams are schematic wellness illustrations, not clinical demonstrations.
"""
from pathlib import Path
import math, io
from PIL import Image
import cairosvg

ROOT = Path(__file__).resolve().parent / 'assets' / 'exercises'
ROOT.mkdir(parents=True, exist_ok=True)
NAMES = ['walk','shoulders','pelvisChair','torso','shift','pelvicFloor','catCow','knees','bridge','birdDog','sitStand']
SKIN='#d39b78'; DARK='#24483e'; SHIRT='#338169'; PANTS='#31544a'; SHOE='#f3eee2'; BG='#e9f4eb'

def shape(d, fill='none', stroke='none', sw=1, more=''):
 return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {more}/>'
def ellipse(x,y,rx,ry,fill):return f'<ellipse cx="{x:.2f}" cy="{y:.2f}" rx="{rx}" ry="{ry}" fill="{fill}"/>'
def dot(x,y,r,fill):return f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r}" fill="{fill}"/>'
def segment(points,color,width=18):
 d='M'+' L'.join(f'{x:.2f},{y:.2f}' for x,y in points)
 return shape(d,'none',DARK,width+5)+shape(d,'none',color,width)
def face(x,y,r=24):
 return dot(x,y,r+2,DARK)+dot(x,y,r,SKIN)+shape(f'M{x-16} {y-5}q-4-25 18-24q17 2 18 20l-3 1q-4-10-14-10q-10 7-19 8z',DARK)+dot(x+8,y+2,1.9,DARK)+shape(f'M{x+9} {y+13} q-6 5-12 0','none','#986749',1.8)
def shoe(x,y,deg=0):
 return f'<g transform="translate({x} {y}) rotate({deg})"><rect x="-16" y="-7" width="37" height="15" rx="7" fill="{DARK}"/><rect x="-13" y="-4" width="31" height="9" rx="4.5" fill="{SHOE}"/></g>'
def arrows(t,place='right'):
 x,y=(356,139) if place=='right' else (85,140)
 pulse=math.sin(2*math.pi*t)
 return f'<g opacity="0.85">{shape(f"M{x-23} {y+27} A46 46 0 0 1 {x+22} {y-28}","none","#79aa88",4,more="stroke-dasharray=\"5 8\"")}{shape(f"M{x+17} {y-36}l9 7-11 6","none","#438a70",4)}</g>'
def scene_start():
 return '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320"><rect width="480" height="320" fill="#eaf4ec"/><circle cx="412" cy="66" r="109" fill="#d7e8d7"/><circle cx="69" cy="274" r="101" fill="#dceee2"/><path d="M28 282H451" stroke="#bad6c7" stroke-width="2"/><g fill="#b1d1bb" opacity="0.8"><circle cx="55" cy="59" r="4"/><circle cx="80" cy="59" r="4"/><circle cx="105" cy="59" r="4"/></g><rect x="25" y="22" rx="13" width="87" height="26" fill="#ffffffb9"/><text x="68" y="39" font-size="10" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" letter-spacing="1" fill="#33755d">PAUSA ✳</text>'
def scene_end():return '</svg>'
def draw_standing(t,typ):
 ph=math.sin(2*math.pi*t)
 v=(1-math.cos(2*math.pi*t))/2
 cx=229; hy=107
 if typ=='shift':cx=229+(v-.5)*34
 if typ=='sitStand':hy=124-52*v
 if typ=='walk':hy=110+3*ph
 shoulder=(cx,hy+52); hip=(cx,hy+108)
 head=face(cx,hy+23,23)
 body=segment([shoulder,(cx,hy+88),hip],SHIRT,42)
 if typ=='walk':
  lstep=34*ph
  arm1=[(cx-17,hy+51),(cx-40,hy+95+8*ph),(cx-62,hy+114+18*ph)]
  arm2=[(cx+17,hy+51),(cx+34,hy+100-8*ph),(cx+53,hy+123-18*ph)]
  knee1=(cx-17+0.5*lstep,hy+150); foot1=(cx-22+lstep,hy+182)
  knee2=(cx+17-0.5*lstep,hy+150); foot2=(cx+22-lstep,hy+182)
 else:
  arm1=[(cx-20,hy+48),(cx-42,hy+101),(cx-42,hy+123)];arm2=[(cx+20,hy+48),(cx+42,hy+101),(cx+42,hy+123)]
  knee1=(cx-18,hy+148);foot1=(cx-26,hy+180)
  knee2=(cx+18,hy+148);foot2=(cx+28,hy+180)
 if typ=='shoulders':
  # Roll arms and shoulders gradually, maintaining slight elbow flexion.
  arm1=[(cx-20,hy+48-5*v),(cx-40-11*ph,hy+93-7*v),(cx-40-13*ph,hy+122)]
  arm2=[(cx+20,hy+48-5*v),(cx+40+11*ph,hy+93-7*v),(cx+40+13*ph,hy+122)]
 if typ=='sitStand':
  seat=250;foot1=(cx-25,282);foot2=(cx+34,282)
  knee1=(cx-25,hy+142+7*(1-v)); knee2=(cx+28,hy+142+7*(1-v))
  arm1=[(cx-20,hy+48),(cx-43,hy+94),(cx-23,hy+105)]
  arm2=[(cx+20,hy+48),(cx+43,hy+94),(cx+20,hy+105)]
 item=''
 if typ=='sitStand':item+=f'<rect x="285" y="205" width="16" height="74" rx="7" fill="#a7c4ab"/><rect x="224" y="227" width="85" height="15" rx="7" fill="#739982"/>'
 if typ=='shift':item+=f'<path d="M335 164V103h95" stroke="#a6c0ac" stroke-width="10" stroke-linecap="round"/>'
 legs=segment([hip,(cx-15,hy+132),knee1,foot1],PANTS,20)+segment([hip,(cx+15,hy+132),knee2,foot2],PANTS,20)
 arms=segment(arm1,SKIN,14)+segment(arm2,SKIN,14)
 out=ellipse(cx,286,67,7,'#abcbb7')+item+legs+body+arms+head+shoe(*foot1)+shoe(*foot2)
 return out+arrows(t,'right')

def draw_seated(t,typ):
 v=(1-math.cos(2*math.pi*t))/2
 x=214; yy=104
 dx=(v-.5)*12 if typ=='pelvisChair' else math.sin(2*math.pi*t)*12
 neck=(x+dx,yy+50)
 hips=(x,219)
 chair=f'<rect x="159" y="200" rx="6" width="132" height="17" fill="#9dbca7"/><rect x="286" y="127" rx="8" width="14" height="91" fill="#9dbca7"/><rect x="170" y="214" rx="7" width="12" height="67" fill="#739780"/><rect x="272" y="214" rx="7" width="12" height="67" fill="#739780"/>'
 legs=segment([(x,215),(x+49,228),(x+74,263)],PANTS,19)+segment([(x,215),(x-33,233),(x-49,263)],PANTS,19)
 arms=segment([(neck[0]-17,yy+48),(x-35,yy+112),(x+9,218)],SKIN,14)+segment([(neck[0]+17,yy+48),(x+36,yy+104),(x+52,216)],SKIN,14)
 if typ=='torso':
  arms=segment([(neck[0]-13,yy+54),(x+30-15*v,yy+94),(x+45,yy+79)],SKIN,14)+segment([(neck[0]+15,yy+52),(x-23+15*v,yy+94),(x-45,yy+79)],SKIN,14)
 body=segment([(neck[0],yy+50),(x+dx*.35,yy+87),hips],SHIRT,37)
 return ellipse(228,287,95,7,'#bbd4c0')+chair+legs+body+arms+face(neck[0],yy+26,22)+shoe(x+74,266)+shoe(x-49,266)+arrows(t)

def draw_floor(t,typ):
 v=(1-math.cos(2*math.pi*t))/2
 background=shape('M40 258H440','none','#9ebaa8',4)+ellipse(243,265,150,6,'#cee5d4')
 if typ=='knees':
  # Front-view torso lying down; both knees roll slowly to either side.
  kneeX=328+36*math.sin(2*math.pi*t)
  legs=segment([(262,232),(kneeX,166),(kneeX+38,221)],PANTS,20)+segment([(251,238),(kneeX-19,177),(kneeX+18,227)],PANTS,20)
  arms=segment([(147,226),(123,253)],SKIN,14)+segment([(210,233),(222,254)],SKIN,14)
  shirt=segment([(140,225),(241,229),(262,232)],SHIRT,39)
  return background+legs+shirt+arms+face(100,220,22)+shoe(kneeX+38,221)+shoe(kneeX+18,227)+arrows(t)
 hx=65;hy=223
 hipY=229
 if typ=='bridge':hipY=229-53*v
 if typ=='pelvicFloor':hipY=229-12*v
 chest=(184,228)
 hip=(258,hipY)
 head=face(hx+34,hy,22)
 torso=segment([(125,232),chest,hip],SHIRT,37)
 leg1=segment([hip,(309,168),(369,233)],PANTS,21)
 leg2=segment([(hip[0]-7,hip[1]+3),(290,172),(351,233)],PANTS,18)
 arms=segment([(145,231),(161,253)],SKIN,13)+segment([(165,229),(179,256)],SKIN,13)
 return background+leg2+leg1+torso+arms+head+shoe(369,235)+shoe(351,235)+arrows(t)

def draw_quadruped(t,typ):
 v=(1-math.cos(2*math.pi*t))/2
 floor=shape('M36 271H447','none','#9ebaa8',4)+ellipse(228,276,145,6,'#c5ddcb')
 head=face(118,137,21)
 if typ=='catCow':
  curve=26*(v-.5)
  back=shape(f'M143 165 Q233 {147-curve*2} 318 170','none',DARK,43)+shape(f'M143 165 Q233 {147-curve*2} 318 170','none',SHIRT,36)
  leftArm=segment([(149,177),(145,225),(132,261)],SKIN,18)
  rightArm=segment([(168,179),(180,231),(174,261)],SKIN,18)
  leg1=segment([(307,176),(329,224),(320,263)],PANTS,21)
  leg2=segment([(286,181),(282,219),(274,261)],PANTS,21)
 else:
  # Slow extension of opposite arm and leg from four-point position.
  back=segment([(151,168),(236,162),(305,179)],SHIRT,39)
  leftArm=segment([(160,180),(142-56*v,220-61*v),(128-72*v,263-113*v)],SKIN,17)
  rightArm=segment([(182,179),(183,222),(180,259)],SKIN,16)
  leg1=segment([(303,183),(320+83*v,220-40*v),(315+104*v,260-93*v)],PANTS,21)
  leg2=segment([(276,182),(267,222),(264,261)],PANTS,21)
 return floor+leg1+leg2+back+leftArm+rightArm+head+arrows(t)

def frame_svg(key,t):
 if key in ('walk','shoulders','shift','sitStand'):person=draw_standing(t,key)
 elif key in ('pelvisChair','torso'):person=draw_seated(t,key)
 elif key in ('pelvicFloor','knees','bridge'):person=draw_floor(t,key)
 else:person=draw_quadruped(t,key)
 tag={'walk':'CAMINAR','shoulders':'HOMBROS','pelvisChair':'PELVIS','torso':'TORSO','shift':'PESO','pelvicFloor':'PELVIS','catCow':'COLUMNA','knees':'RODILLAS','bridge':'GLÚTEOS','birdDog':'ESTABILIDAD','sitStand':'SILLA'}[key]
 return scene_start()+person+f'<rect x="346" y="22" width="109" height="26" rx="13" fill="#ffffffb5"/><text x="401" y="39" text-anchor="middle" font-size="10" font-weight="700" font-family="Arial,sans-serif" letter-spacing=".3" fill="#327b66">{tag}</text>'+scene_end()

for name in NAMES:
 frames=[]
 for i in range(16):
  svg=frame_svg(name,i/16)
  png=cairosvg.svg2png(bytestring=svg.encode('utf-8'),output_width=480,output_height=320)
  frames.append(Image.open(io.BytesIO(png)).convert('RGB'))
 frames[2].save(ROOT/f'{name}.png',optimize=True)
 palette=[f.quantize(colors=96,method=Image.Quantize.FASTOCTREE) for f in frames]
 palette[0].save(ROOT/f'{name}.gif',save_all=True,append_images=palette[1:],duration=125,loop=0,optimize=True,disposal=2)
 print(name,'image',round((ROOT/f'{name}.png').stat().st_size/1024),'kB','gif',round((ROOT/f'{name}.gif').stat().st_size/1024),'kB')
