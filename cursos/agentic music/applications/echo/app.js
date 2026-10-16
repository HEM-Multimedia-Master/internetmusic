import {$,clamp,download,wavBlob,wirePad,wireFullscreen,friendlyError} from '../commun/audio.js';
import {voix,prochaineDecision} from './politique.js';
let ctx,master,pan,analyser,stream,micNode,timer,generation=0,memoire=0,etat='calme',change=0,next=0;
let history=[];const active=new Set();
function note(context,dest,t,hz,type,vol,panValue=0,duration=.28){
 const o=context.createOscillator(),g=context.createGain(),p=context.createStereoPanner();
 o.type=type;o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
 p.pan.value=panValue;o.connect(g).connect(p).connect(dest);o.start(t);o.stop(t+duration+.02);
 if(!(context instanceof OfflineAudioContext))active.add(o);o.onended=()=>{active.delete(o);o.disconnect();g.disconnect();p.disconnect();};
}
function stop(){
 generation++;clearInterval(timer);timer=null;stream?.getTracks().forEach(t=>t.stop());stream=null;micNode?.disconnect();micNode=null;analyser=null;
 for(const o of active){try{o.stop();}catch{}}active.clear();
 if(ctx&&master){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.01);}
 $('start').disabled=false;$('stop').disabled=true;$('source').disabled=false;$('status').textContent='Arrêt : son et microphone coupés.';
}
$('start').onclick=async()=>{
 const run=++generation;$('start').disabled=true;$('stop').disabled=false;$('source').disabled=true;
 try{
 ctx ||= new AudioContext();await ctx.resume();if(run!==generation)return;
 master?.disconnect();pan?.disconnect();master=ctx.createGain();master.gain.value=.7;pan=ctx.createStereoPanner();master.connect(pan).connect(ctx.destination);
 if($('source').value==='mic'){
  if(!navigator.mediaDevices?.getUserMedia)throw Error('Micro indisponible : ouvrir localhost ou une URL HTTPS.');
  $('status').textContent='Autoriser le microphone, ou cliquer Arrêter.';
  const s=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
  if(run!==generation){s.getTracks().forEach(t=>t.stop());return;}
  stream=s;micNode=ctx.createMediaStreamSource(s);analyser=ctx.createAnalyser();analyser.fftSize=1024;micNode.connect(analyser);
 }
 memoire=0;etat='calme';change=ctx.currentTime;next=ctx.currentTime;history=[];
 const data=new Float32Array(1024);
 const tick=()=>{
  let energie=Number($('energy').value);
  if(analyser){analyser.getFloatTimeDomainData(data);let sum=0;for(const x of data)sum+=x*x;energie=clamp(Math.sqrt(sum/data.length)*Number($('sensitivity').value),0,1);}
  memoire=.92*memoire+.08*energie;
  let wanted=$('assist').checked?prochaineDecision(etat,memoire):$('manual').value;
  if(wanted!==etat&&ctx.currentTime-change>=.6){etat=wanted;change=ctx.currentTime;}
  $('level').value=energie;$('hud').textContent=`état : ${etat}\nmémoire : ${memoire.toFixed(2)} · énergie : ${energie.toFixed(2)}`;
  if(ctx.currentTime>=next){const v=voix[etat],volume=Number($('volume').value),pv=Number($('pan').value);note(ctx,master,ctx.currentTime+.01,v.hz,v.type,volume,pv);history.push({time:ctx.currentTime,hz:v.hz,type:v.type,volume,pan:pv});history=history.filter(e=>e.time>ctx.currentTime-12);next=ctx.currentTime+.35;}
 };
 tick();timer=setInterval(tick,25);$('status').textContent='En jeu : '+($('source').value==='mic'?'micro local.':'énergie simulée.');
 }catch(e){if(run===generation){stop();$('status').textContent=friendlyError(e);}}
};
$('stop').onclick=stop;
$('energy').oninput=()=>$('energyValue').value=Number($('energy').value).toFixed(2);
$('volume').oninput=()=>$('volumeValue').value=Number($('volume').value).toFixed(2);
wirePad('pad',(x,y,shift)=>{$('pan').value=2*x-1;if(!shift){$('volume').value=y*.3;$('volume').oninput();}});
wireFullscreen('fullscreen','status');
$('export').onclick=async()=>{
 if(!history.length){$('status').textContent='Jouer quelques secondes avant d’exporter.';return;}
 $('export').disabled=true;
 try{const copy=history.map(e=>({...e})),off=new OfflineAudioContext(2,44100*12,44100),gain=off.createGain();gain.gain.value=.7;gain.connect(off.destination);const start=copy[0].time;
 for(const e of copy)note(off,gain,e.time-start,e.hz,e.type,e.volume,e.pan);
 download(wavBlob(await off.startRendering()),'echo-decisions-12s.wav');$('status').textContent='WAV exporté : reconstruction des décisions, complétée par du silence si nécessaire.';
 }catch(e){$('status').textContent=e.message;}finally{$('export').disabled=false;}
};
window.addEventListener('pagehide',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer)stop();});
