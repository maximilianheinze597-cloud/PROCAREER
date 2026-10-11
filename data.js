const R=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ROLE={GK:'GK',CB:'DEF',LB:'DEF',RB:'DEF',CDM:'MID',CM:'MID',CAM:'MID',LW:'FWD',RW:'FWD',ST:'FWD'};
const L=(r,x,zs)=>zs.map(z=>[r,x,z]);
const FORMS={
'4-4-2':[['GK',0,0],...L('DEF',.27,[-.75,-.25,.25,.75]),...L('MID',.55,[-.75,-.25,.25,.75]),...L('FWD',.82,[-.3,.3])],
'4-3-3':[['GK',0,0],...L('DEF',.27,[-.75,-.25,.25,.75]),...L('MID',.52,[-.5,0,.5]),...L('FWD',.82,[-.65,0,.65])],
'3-5-2':[['GK',0,0],...L('DEF',.27,[-.5,0,.5]),...L('MID',.52,[-.9,-.45,0,.45,.9]),...L('FWD',.82,[-.3,.3])],
'4-2-3-1':[['GK',0,0],...L('DEF',.27,[-.75,-.25,.25,.75]),...L('MID',.45,[-.3,.3]),...L('MID',.66,[-.6,0,.6]),...L('FWD',.85,[0])]};
const CLUBS=[
{id:0,name:'FC Rheinstadt',col:0xd32f2f,col2:0xffffff,str:74,stadium:'Rheinarena'},
{id:1,name:'SV Nordhafen',col:0x1565c0,col2:0xffffff,str:72,stadium:'Hafenstadion'},
{id:2,name:'Union Bergland',col:0x2e7d32,col2:0xfff176,str:69,stadium:'Bergwiese'},
{id:3,name:'AC Südstern',col:0xf9a825,col2:0x111111,str:67,stadium:'Sternplatz'},
{id:4,name:'Dynamo Elbtal',col:0x6a1b9a,col2:0xffffff,str:65,stadium:'Elbtalstadion'},
{id:5,name:'FK Waldau',col:0x00838f,col2:0xffffff,str:62,stadium:'Waldaupark'},
{id:6,name:'Real Seeburg',col:0xeeeeee,col2:0x1565c0,str:60,stadium:'Seeburg-Arena'},
{id:7,name:'TSG Altmark',col:0xe65100,col2:0x222222,str:57,stadium:'Altmarkring'}];
const FN=['Max','Leon','Jonas','Luca','Noah','Finn','Tim','Paul','Ben','Elias','Mats','Jan','Emil','Nico','Theo','Aron'];
const LN=['Keller','Brandt','Vogel','Berger','Hartmann','Lenz','Roth','Winter','Falk','Sommer','Kaiser','Wolf','Engel','Busch','Horn','Moser'];
const KEYS=['pac','sho','pas','dri','def','phy','gk'];
const WT={FWD:{sho:.35,pac:.2,dri:.2,pas:.1,phy:.1,def:.05},MID:{pas:.3,dri:.2,sho:.1,pac:.1,def:.15,phy:.15},DEF:{def:.4,phy:.25,pac:.15,pas:.1,dri:.05,sho:.05},GK:{gk:1}};
const calcOvr=(a,role)=>{let s=0;for(const k in WT[role])s+=a[k]*WT[role][k];return Math.round(s)};
function mkPlayer(pos,base,id){const role=ROLE[pos],att={};
 for(const k of KEYS)att[k]=clamp(base+RI(-8,8),25,95);
 if(role==='GK'){att.gk=clamp(base+RI(-3,3),30,95);for(const k of KEYS)if(k!=='gk')att[k]=RI(25,45)}else att.gk=15;
 const age=RI(18,35);return{id,name:FN[RI(0,15)]+' '+LN[RI(0,15)],pos,role,age,att,ovr:calcOvr(att,role),pot:Math.min(92,base+Math.max(0,(27-age)*2))}}
function makeSquad(club){const ps=[['GK',2],['CB',4],['LB',1],['RB',2],['CM',3],['CDM',2],['CAM',2],['LW',1],['RW',1],['ST',2]],sq=[];
 let n=0;for(const[p,c]of ps)for(let i=0;i<c;i++)sq.push(mkPlayer(p,club.str+RI(-6,5)-(i>0?3:0),club.id+'_'+(n++)));return sq}
function lineup(squad,form,meId){const used=new Set(),out=[];
 for(const[r,x,z]of FORMS[form]){let best=null;
  for(const p of squad){if(used.has(p.id)||p.role!==r)continue;if(p.id===meId){best=p;break}if(!best||p.ovr>best.ovr)best=p}
  if(!best)for(const p of squad)if(!used.has(p.id)&&(!best||p.ovr>best.ovr))best=p;
  used.add(best.id);out.push({...best,slotRole:r,fx:x,fz:z,me:best.id===meId})}return out}
