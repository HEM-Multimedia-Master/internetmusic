# Instruments de la séance 1

Ouvrir ce dossier dans VS Code. Installer l’extension **Live Server**, puis clic droit sur `index.html` → **Open with Live Server**. Utiliser le navigateur externe pour le son et le micro. Variante, si Node.js est installé : `npx --yes serve .` ; ouvrir l’adresse locale affichée.

Le dossier est autonome : conserver `commun/`, `echo/`, `nuage/`, `assets/` et le fichier `index.html`. Copier son contenu à la racine d’un dépôt GitHub étudiant, avec `.nojekyll`, puis choisir **Settings → Pages → Deploy from a branch → main → /(root)**. Aucun secret n’est nécessaire.

Le code fonctionne avec les API natives du navigateur ; aucune dépendance npm, aucun téléchargement de poids et aucun serveur d’inférence. Les règles d’Écho sont écrites à la main. Nuage calcule deux descripteurs puis apprend les moyennes des exemples par catégorie. Un agent LLM peut aider à modifier les sources, mais n’est pas exécuté dans ces applications.

**Écho** : source curseur par défaut ; micro facultatif ; arrêt libérant les pistes ; aide désactivable ; export de la synthèse reconstruite, pas de la voix.

**Nuage** : démo WAV originale ; import MP3/WAV ; capture micro de quatre secondes lorsque le navigateur la supporte ; apprentissage d’au moins deux catégories ; contrôle manuel ; export source WAV, scène WAV et modèle JSON. La scène exportée garde les paramètres au moment du clic, sans enregistrer les gestes. Les modèles exportés servent à l’inspection ; cette version ne propose pas leur réimportation.

Commencer à faible volume. Le micro n’est pas connecté directement à la sortie audio. Le passage dans un onglet masqué arrête l’instrument. Les demandes d’accès au micro restent soumises aux permissions du navigateur et du système.

Le son `assets/demo-originale.wav` a été synthétisé pour ce cours ; il comprend trois zones de trois secondes : sinus grave, son harmonique, bruit déterministe. Les sources du cours et les samples personnels nécessitent une décision d’attribution/licence de l’enseignant avant diffusion générale. Aucun extrait des livres n’est intégré aux applications.
