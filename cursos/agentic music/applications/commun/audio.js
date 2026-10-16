export const $ = id => document.getElementById(id);
export const clamp = (v,lo,hi) => Math.min(hi,Math.max(lo,v));
export function download(blob,name){
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
export function wavBlob(buffer){
 const channels=buffer.numberOfChannels,n=buffer.length,bps=2;
 const data=new ArrayBuffer(44+n*channels*bps),v=new DataView(data);
 const text=(p,t)=>{for(let i=0;i<t.length;i++)v.setUint8(p+i,t.charCodeAt(i));};
 text(0,'RIFF');v.setUint32(4,36+n*channels*bps,true);text(8,'WAVE');text(12,'fmt ');
 v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,channels,true);v.setUint32(24,buffer.sampleRate,true);
 v.setUint32(28,buffer.sampleRate*channels*bps,true);v.setUint16(32,channels*bps,true);v.setUint16(34,16,true);text(36,'data');v.setUint32(40,n*channels*bps,true);
 const arrays=Array.from({length:channels},(_,i)=>buffer.getChannelData(i));let pos=44;
 for(let i=0;i<n;i++)for(let c=0;c<channels;c++){const x=clamp(arrays[c][i],-1,1);v.setInt16(pos,x<0?x*32768:x*32767,true);pos+=2;}
 return new Blob([data],{type:'audio/wav'});
}
export function wirePad(id,handler){
 const pad=$(id),cross=pad.querySelector('.cross');
 const move=e=>{const r=pad.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width,0,1),y=clamp((e.clientY-r.top)/r.height,0,1);cross.style.left=`${x*100}%`;cross.style.top=`${y*100}%`;handler(x,1-y,e.shiftKey);};
 pad.addEventListener('pointerdown',e=>{pad.setPointerCapture(e.pointerId);move(e);});
 pad.addEventListener('pointermove',e=>{if(pad.hasPointerCapture(e.pointerId))move(e);});
}
export function wireFullscreen(button,status){
 $(button).onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else $(status).textContent='Plein écran indisponible ici : utiliser le mode paysage ou agrandir la fenêtre.';}catch(e){$(status).textContent='Plein écran refusé : '+e.message;}};
}
export function friendlyError(e){return ({NotAllowedError:'Micro refusé : autoriser dans le navigateur et le système, ou utiliser le curseur.',NotFoundError:'Aucun micro trouvé : utiliser le curseur ou le son de démonstration.',NotReadableError:'Le micro est occupé : fermer l’autre application.'})[e.name]||e.message;}
