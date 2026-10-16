// Politique explicite : les seuils sont des choix de composition.
export const voix={calme:{hz:110,type:'sine'},actif:{hz:220,type:'triangle'},dense:{hz:330,type:'sawtooth'}};
export function prochaineDecision(etat,memoire){
 if(etat==='calme')return memoire>0.25?'actif':'calme';
 if(etat==='actif')return memoire>0.60?'dense':memoire<0.18?'calme':'actif';
 return memoire<0.48?'actif':'dense';
}
