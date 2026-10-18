// Deux descripteurs volontairement simples ; aucun réseau neuronal.
export function descripteurs(samples,sampleRate,startSeconds,duration=.25){
 const start=Math.max(0,Math.min(samples.length-1,Math.floor(startSeconds*sampleRate)));
 const end=Math.min(samples.length,start+Math.max(2,Math.floor(duration*sampleRate)));
 let power=0,crossings=0;
 for(let i=start;i<end;i++){power+=samples[i]*samples[i];if(i>start&&((samples[i]>=0)!==(samples[i-1]>=0)))crossings++;}
 const n=Math.max(1,end-start);return [Math.sqrt(power/n),crossings/n];
}
export function apprendre(exemples){
 const groups={};for(const e of exemples){groups[e.label] ||= [];groups[e.label].push(e.features);}
 return Object.entries(groups).map(([label,rows])=>({label,n:rows.length,center:[0,1].map(k=>rows.reduce((s,r)=>s+r[k],0)/rows.length)}));
}
export function predire(features,centres){
 if(!centres.length)return null;
 // Échelles fixes publiées : RMS et ZCR n'ont pas le même ordre de grandeur.
 const distances=centres.map(c=>({label:c.label,distance:Math.hypot((features[0]-c.center[0])/.2,(features[1]-c.center[1])/.15)}));
 distances.sort((a,b)=>a.distance-b.distance);return {label:distances[0].label,distances};
}
