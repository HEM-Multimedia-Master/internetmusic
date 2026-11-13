
# interface

### Windows Interface — English / Français

Basic vocabulary for navigating Windows, VS Code, and GitHub.

#### 1. Windows interface

| English       | Français                 |
| ------------- | ------------------------ |
| Desktop       | Bureau                   |
| Window        | Fenêtre                  |
| Start menu    | Menu Démarrer            |
| Taskbar       | Barre des tâches         |
| Search bar    | Barre de recherche       |
| File Explorer | Explorateur de fichiers  |
| Folder        | Dossier                  |
| File          | Fichier                  |
| Shortcut      | Raccourci                |
| Recycle Bin   | Corbeille                |
| Settings      | Paramètres               |
| Control Panel | Panneau de configuration |
| Notification  | Notification             |
| System tray   | Zone de notification     |
| Right-click   | Clic droit               |
| Double-click  | Double-clic              |
| Scroll        | Faire défiler            |
| Drag and drop | Glisser-déposer          |

#### 2. Window controls and menus


| English              | Français                          | Windows Shortcut / Raccourcis clavier      |
| -------------------- | --------------------------------- | ------------------------------------------ |
| Menu bar             | Barre de menus                    | `Alt` (in many applications)               |
| Toolbar              | Barre d'outils                    | —                                          |
| Title bar            | Barre de titre                    | —                                          |
| Address bar          | Barre d'adresse                   | `Alt + D` (File Explorer/browser)          |
| Sidebar              | Barre latérale                    | —                                          |
| Tab                  | Onglet                            | `Ctrl + Tab` (next tab)                    |
| New tab              | Nouvel onglet                     | `Ctrl + T`                                 |
| Close tab            | Fermer l'onglet                   | `Ctrl + W`                                 |
| Dropdown menu        | Menu déroulant                    | `Alt + ↓` (when focused)                   |
| Context menu         | Menu contextuel                   | `Shift + F10`                              |
| Button               | Bouton                            | `Enter` / `Space` (when focused)           |
| Checkbox             | Case à cocher                     | `Space` (when focused)                     |
| Gear icon / Settings | Roue dentée / Paramètres          | `Win + I` (Windows Settings)               |
| Close window         | Fermer la fenêtre                 | `Alt + F4`                                 |
| Minimize window      | Réduire la fenêtre                | `Win + ↓` (from normal size)               |
| Maximize window      | Agrandir la fenêtre               | `Win + ↑`                                  |
| Restore window       | Restaurer la fenêtre              | `Win + ↓` (from maximized)                 |
| Switch windows       | Changer de fenêtre                | `Alt + Tab`                                |
| Refresh              | Actualiser                        | `F5`                                       |
| Save                 | Enregistrer                       | `Ctrl + S`                                 |
| Save as              | Enregistrer sous                  | `Ctrl + Shift + S` (application-dependent) |
| Open                 | Ouvrir                            | `Ctrl + O`                                 |
| Browse               | Parcourir                         | —                                          |
| Search               | Rechercher                        | `Ctrl + F`                                 |
| Select all           | Tout sélectionner                 | `Ctrl + A`                                 |
| Copy                 | Copier                            | `Ctrl + C`                                 |
| Paste                | Coller                            | `Ctrl + V`                                 |
| Cut                  | Couper                            | `Ctrl + X`                                 |
| Undo                 | Annuler                           | `Ctrl + Z`                                 |
| Redo                 | Rétablir                          | `Ctrl + Y` (application-dependent)         |
| Open File Explorer   | Ouvrir l'Explorateur de fichiers  | `Win + E`                                  |
| Open Start menu      | Ouvrir le menu Démarrer           | `Win`                                      |
| Open Task Manager    | Ouvrir le Gestionnaire des tâches | `Ctrl + Shift + Esc`                       |
| Lock computer        | Verrouiller l'ordinateur          | `Win + L`                                  |
| Show desktop         | Afficher le bureau                | `Win + D`                                  |

`Win` = Windows key (⊞). `—` = no universal shortcut.

Shortcuts can vary between Windows applications, particularly VS Code, browsers, and File Explorer.
#### 3. VS Code interface

|English|Français|
|---|---|
|Editor|Éditeur|
|Explorer|Explorateur|
|Extensions|Extensions|
|Settings|Paramètres|
|Command Palette|Palette de commandes|
|Integrated Terminal|Terminal intégré|
|Terminal|Terminal|
|Debugger|Débogueur|
|Run|Exécuter|
|Run and Debug|Exécuter et déboguer|
|Source Control|Contrôle de code source|
|Problems|Problèmes|
|Output|Sortie|
|Workspace|Espace de travail|
|Status bar|Barre d'état|
|Split Editor|Fractionner l'éditeur|
|Open Folder|Ouvrir un dossier|
|New File|Nouveau fichier|

#### 4. Git and GitHub vocabulary

|English|Français|
|---|---|
|Repository|Dépôt|
|Clone|Cloner|
|Branch|Branche|
|Commit|Commit / Validation|
|Push|Pousser / Envoyer|
|Pull|Récupérer|
|Fetch|Récupérer (sans fusionner)|
|Merge|Fusionner|
|Fork|Fork / Bifurcation|
|Pull Request|Demande de fusion|
|Issue|Ticket|
|Changes|Modifications|
|Staged Changes|Modifications indexées|
|Unstaged Changes|Modifications non indexées|
|Authentication|Authentification|
|Sign in|Se connecter|
|Sign out|Se déconnecter|
|Permissions|Autorisations|
|Access token|Jeton d'accès|

#### 5. Terminal and basic commands mac / window 


| English                             | Français                               | macOS (Terminal)        | Windows (PowerShell)               | Windows (CMD)              |
| ----------------------------------- | -------------------------------------- | ----------------------- | ---------------------------------- | -------------------------- |
| Current directory                   | Répertoire courant                     | `pwd`                   | `pwd`                              | `cd`                       |
| List files                          | Lister les fichiers                    | `ls`                    | `ls`                               | `dir`                      |
| Change directory                    | Changer de répertoire                  | `cd folder`             | `cd folder`                        | `cd folder`                |
| Go to parent directory              | Aller au répertoire parent             | `cd ..`                 | `cd ..`                            | `cd ..`                    |
| Go to home directory                | Aller au répertoire personnel          | `cd ~`                  | `cd ~`                             | `cd %USERPROFILE%`         |
| Create directory                    | Créer un répertoire                    | `mkdir folder`          | `mkdir folder`                     | `mkdir folder`             |
| Create empty file                   | Créer un fichier vide                  | `touch file.txt`        | `New-Item file.txt -ItemType File` | `type nul > file.txt`      |
| Remove file                         | Supprimer un fichier                   | `rm file.txt`           | `rm file.txt`                      | `del file.txt`             |
| Remove directory                    | Supprimer un dossier                   | `rm -r folder`          | `Remove-Item folder -Recurse`      | `rmdir /s folder`          |
| Copy file                           | Copier un fichier                      | `cp a.txt b.txt`        | `cp a.txt b.txt`                   | `copy a.txt b.txt`         |
| Move file                           | Déplacer un fichier                    | `mv a.txt folder/`      | `mv a.txt folder/`                 | `move a.txt folder\`       |
| Rename file                         | Renommer un fichier                    | `mv a.txt b.txt`        | `ren a.txt b.txt`                  | `ren a.txt b.txt`          |
| Clear terminal                      | Effacer le terminal                    | `clear`                 | `cls`                              | `cls`                      |
| Command history                     | Historique des commandes               | `history`               | `Get-History`                      | `doskey /history`          |
| Display file contents               | Afficher le contenu d'un fichier       | `cat file.txt`          | `cat file.txt`                     | `type file.txt`            |
| Find text in file                   | Rechercher du texte dans un fichier    | `grep "hello" file.txt` | `Select-String "hello" file.txt`   | `findstr "hello" file.txt` |
| Show running processes              | Afficher les processus actifs          | `ps aux`                | `Get-Process`                      | `tasklist`                 |
| Stop a running command              | Arrêter une commande                   | `Ctrl + C`              | `Ctrl + C`                         | `Ctrl + C`                 |
| Exit terminal session               | Quitter le terminal                    | `exit`                  | `exit`                             | `exit`                     |
| Open current folder in file manager | Ouvrir le dossier courant              | `open .`                | `explorer .`                       | `explorer .`               |
| Open VS Code in current folder      | Ouvrir VS Code dans le dossier courant | `code .`                | `code .`                           | `code .`                   |

Notes:

- macOS uses Zsh by default.
- Windows PowerShell supports many Unix-like command aliases (`ls`, `pwd`, `cat`, `rm`).
- Windows CMD uses different commands and syntax.
- `code .` requires VS Code to be installed and its command-line launcher available in `PATH`.
- File deletion commands can permanently remove files.
The commands above work in PowerShell. Some differ in traditional Windows CMD.

#### 6. Essential keyboard shortcuts

|Action (English)|Action (Français)|Windows shortcut|
|---|---|---|
|Copy|Copier|`Ctrl + C`|
|Paste|Coller|`Ctrl + V`|
|Cut|Couper|`Ctrl + X`|
|Save|Enregistrer|`Ctrl + S`|
|Undo|Annuler|`Ctrl + Z`|
|Redo|Rétablir|`Ctrl + Y`|
|Select all|Tout sélectionner|`Ctrl + A`|
|Find|Rechercher|`Ctrl + F`|
|Open|Ouvrir|`Ctrl + O`|
|New window|Nouvelle fenêtre|`Ctrl + N`|
|Close window|Fermer la fenêtre|`Alt + F4`|
|Switch applications|Changer d'application|`Alt + Tab`|
|Open File Explorer|Ouvrir l'Explorateur|`Win + E`|
|Open Settings|Ouvrir les Paramètres|`Win + I`|
|Open terminal (VS Code)|Ouvrir le terminal|`` Ctrl + ` ``|
|Command Palette (VS Code)|Palette de commandes|`Ctrl + Shift + P`|
|Settings (VS Code)|Paramètres|`Ctrl + ,`|

Note: Git terminology is frequently retained in English, even in French-language development environments. For teaching, it is useful to introduce both terms while keeping the actual Git commands in English.