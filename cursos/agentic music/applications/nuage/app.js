import {$,clamp,download,wavBlob,wirePad,wireFullscreen,friendlyError} from '../commun/audio.js';
import {descripteurs,apprendre,predire} from './modele.js';
let ctx,buffer,master,clock,next=0,stream,recorder,recordTimer,examples=[],centres=[],generation=0,playing=false;
const nodes=new Set();const presets={calme:{size:160,density:5,rate:.8},actif:{size:90,density:11,rate:1},dense:{size:40,density:20,rate:1.3}};
async function context(){ctx ||= new AudioContext();await ctx.resume();return ctx;}
function sourcePosition(){return Number($('position').value)*Math.max(0,(buffer?.duration||0)-.26);}
function analyse(){return buffer?descripteurs(buffer.getChannelData(0),buffer.sampleRate,sourcePosition()):[0,0];}
function parameters(){
 const f=analyse(),prediction=predire(f,centres),manual={size:Number($('size').value),density:Number($('density').value),rate:Number($('rate').value)};
 const use=$('assist').checked&&centres.length>=2&&prediction&&prediction.distances[0].distance<=3;
 const p=use?presets[prediction.label]:manual;
 $('hud').textContent=`RMS : ${f[0].toFixed(3)} · ZCR : ${f[1].toFixed(3)}\nproposition : ${prediction?.label||'aucune'} · mode : ${use?'appris':'manuel'}\ngrains : ${p.size} ms · ${p.density}/s · vitesse ${p.rate}`;
 return {...p,position:sourcePosition(),volume:Number($('volume').value)};
}
function refresh(){centres=apprendre(examples);$('training').textContent=`${examples.length} exemples · ${centres.length} catégories`;$('centres').textContent=JSON.stringify(centres,null,2);$('positionValue').value=sourcePosition().toFixed(2)+' s';parameters();}
function draw(){const canvas=$('wave'),c=canvas.getContext('2d'),a=buffer.getChannelData(0);c.clearRect(0,0,canvas.width,canvas.height);c.strokeStyle='#68e0d0';c.beginPath();for(let x=0;x<canvas.width;x++){const start=Math.floor(x*a.length/canvas.width),end=Math.max(start+1,Math.floor((x+1)*a.length/canvas.width));let lo=1,hi=-1;for(let i=start;i<end;i++){lo=Math.min(lo,a[i]);hi=Math.max(hi,a[i]);}c.moveTo(x,50+lo*45);c.lineTo(x,50+hi*45);}c.stroke();}
function setBuffer(b,name){if(b.duration>60||b.duration<.05)throw Error('Choisir un son entre 0.05 et 60 secondes.');buffer=b;examples=[];centres=[];$('assist').checked=false;$('position').value=0;draw();refresh();$('status').textContent=`${name} · ${b.duration.toFixed(2)} s · ${b.sampleRate} Hz. Ajouter vos exemples.`;}
function grain(context,destination,t,p,offset=p.position){
 const src=context.createBufferSource(),g=context.createGain();src.buffer=buffer;src.playbackRate.value=p.rate;
 const length=Math.min(p.size/1000,(buffer.duration-offset)/p.rate);if(length<.005)return;
 const curve=new Float32Array(64);for(let i=0;i<64;i++)curve[i]=Math.sin(Math.PI*i/63)**2*p.volume*.5;
 g.gain.setValueCurveAtTime(curve,t,length);src.connect(g).connect(destination);src.start(t,offset,length*p.rate);src.stop(t+length+.005);if(!(context instanceof OfflineAudioContext))nodes.add(src);src.onended=()=>{nodes.delete(src);src.disconnect();g.disconnect();};
}
function stop(){generation++;playing=false;clearInterval(clock);clock=null;clearTimeout(recordTimer);if(recorder?.state==='recording')recorder.stop();stream?.getTracks().forEach(t=>t.stop());stream=null;for(const n of nodes){try{n.stop();}catch{}}nodes.clear();$('play').disabled=false;$('record').disabled=false;$('status').textContent='Arrêt : grains et microphone coupés.';}
$('demo').onclick=async()=>{stop();const run=generation;try{await context();const response=await fetch('../assets/demo-originale.wav');if(!response.ok)throw Error('Démo introuvable : ouvrir le dossier avec un serveur local.');const b=await ctx.decodeAudioData(await response.arrayBuffer());if(run===generation)setBuffer(b,'Démo originale');}catch(e){if(run===generation)$('status').textContent=e.message;}};
$('file').onchange=async e=>{const file=e.target.files[0];if(!file)return;stop();const run=generation;try{if(file.size>20*1024*1024)throw Error('Fichier trop grand : choisir moins de 20 Mo.');await context();const b=await ctx.decodeAudioData(await file.arrayBuffer());if(run===generation)setBuffer(b,file.name);}catch(e){if(run===generation)$('status').textContent='Import impossible : '+e.message;}};
$('record').onclick=async()=>{
 stop();const run=generation;$('record').disabled=true;$('play').disabled=true;
 try{await context();if(run!==generation)return;if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error('Capture indisponible : importer un WAV ou ouvrir une URL HTTPS.');
 $('status').textContent='Autoriser le microphone. Capture de 4 secondes, puis fermeture.';const s=await navigator.mediaDevices.getUserMedia({audio:true,video:false});if(run!==generation){s.getTracks().forEach(t=>t.stop());return;}stream=s;
 const mime=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(m=>MediaRecorder.isTypeSupported(m));const rec=new MediaRecorder(s,mime?{mimeType:mime}:{});recorder=rec;const chunks=[];
 rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 rec.onstop=async()=>{s.getTracks().forEach(t=>t.stop());if(stream===s)stream=null;if(recorder===rec)recorder=null;if(run!==generation)return;$('record').disabled=false;$('play').disabled=false;try{const b=await ctx.decodeAudioData(await new Blob(chunks,{type:rec.mimeType}).arrayBuffer());if(run===generation)setBuffer(b,'Capture microphone');}catch(e){if(run===generation)$('status').textContent='Décodage de capture impossible : importer un WAV. '+e.message;}};
 rec.onerror=()=>{if(run===generation){stop();$('status').textContent='Capture interrompue : importer un WAV.';}};
 rec.start();recordTimer=setTimeout(()=>{if(rec.state==='recording')rec.stop();},4000);
 }catch(e){if(run===generation){stop();$('status').textContent=friendlyError(e);}}
};
$('teach').onclick=()=>{if(!buffer){$('status').textContent='Charger un son avant d’ajouter un exemple.';return;}if(examples.length>=60){$('status').textContent='Limite pédagogique : 60 exemples.';return;}examples.push({label:$('label').value,features:analyse(),position:sourcePosition()});refresh();};
$('reset').onclick=()=>{examples=[];$('assist').checked=false;refresh();};
$('assist').onchange=()=>{if($('assist').checked&&centres.length<2){$('assist').checked=false;$('status').textContent='Ajouter des exemples dans au moins deux catégories.';}parameters();};
for(const id of ['position','volume','size','density','rate'])$(id).oninput=()=>{if(id==='position')$('positionValue').value=sourcePosition().toFixed(2)+' s';parameters();};
wirePad('pad',(x,y,shift)=>{$('position').value=x;if(!shift)$('volume').value=y*.35;$('position').oninput();});wireFullscreen('fullscreen','status');
$('play').onclick=async()=>{
 if(!buffer){$('status').textContent='Charger la démo, un MP3 ou un WAV.';return;}if(playing)return;const run=++generation;$('play').disabled=true;
 try{await context();if(run!==generation)return;master?.disconnect();master=ctx.createGain();master.gain.value=.8;master.connect(ctx.destination);playing=true;next=ctx.currentTime+.02;
 clock=setInterval(()=>{const p=parameters();if(next<ctx.currentTime)next=ctx.currentTime+.01;while(next<ctx.currentTime+.12){grain(ctx,master,next,p);next+=1/p.density;}},25);$('status').textContent='En jeu : changer position, aide ou paramètres pendant l’écoute.';
 }catch(e){if(run===generation){stop();$('status').textContent=e.message;}}
};
$('listen').onclick=async()=>{if(!buffer){$('status').textContent='Charger un son.';return;}const run=generation;await context();if(run!==generation)return;const s=ctx.createBufferSource(),g=ctx.createGain();s.buffer=buffer;g.gain.value=Number($('volume').value)*.8;s.connect(g).connect(ctx.destination);s.start(0,sourcePosition(),Math.min(.5,buffer.duration-sourcePosition()));nodes.add(s);s.onended=()=>{nodes.delete(s);s.disconnect();g.disconnect();};};
$('stop').onclick=stop;
$('export').onclick=async()=>{
 if(!buffer){$('status').textContent='Charger un son avant l’export.';return;}$('export').disabled=true;
 try{const p=parameters(),off=new OfflineAudioContext(2,44100*12,44100),g=off.createGain();g.gain.value=.8;g.connect(off.destination);for(let t=0;t<12-p.size/1000;t+=1/p.density)grain(off,g,t,p);download(wavBlob(await off.startRendering()),'nuage-scene-12s.wav');$('status').textContent='Scène WAV exportée avec les réglages figés au moment du clic.';}catch(e){$('status').textContent=e.message;}finally{$('export').disabled=false;}
};
$('sample').onclick=()=>{if(buffer)download(wavBlob(buffer),'nuage-source.wav');else $('status').textContent='Charger un son avant l’export.';};
$('model').onclick=()=>download(new Blob([JSON.stringify({version:1,method:'centroides-RMS-ZCR',featureScales:[.2,.15],rejectionDistance:3,source:buffer?{duration:buffer.duration,sampleRate:buffer.sampleRate}:null,examples,centres},null,2)],{type:'application/json'}),'nuage-modele.json');
window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden&&(playing||stream))stop();});
