#technologies 
clear 
pwd
ls
cat
cd
code 
rm -rf   //remove -rf recursive (subfolders and files) force 
mkdir 

## keys - touches de raccourci 
tab - complete
control + c - terminer 
control + z - terminer 


## init files of a bash or others

~/bash_profile > is the default source file for **terminal**
~/.bash.rc
~/.zhrc for **z shell**
~/.config/fish/fish.config  **fish**

### reload shell
source ~/.bashrc # or ~/.zshrc


## git

```bash
git clone
git pull
```

## to upload your version of repository

```bash
git add
git commit -m "message"
git push

git checkout
git clone --branch <branchname> <remote-repo-url>
```


##  config user 

```bash
git config --global --edit
```

```r
[user]
name = <github-user>
email = 
```


## Create Personal Access Token on GitHub

From your GitHub account, go to **Settings** → **Developer Settings** → **Personal Access Token** → **Generate New Token** (Give your password) → **Fillup the form** → click **Generate token** → **Copy the generated Token**, it will be something like...

```bash
ghp_sFhFsSHhTzMDreGRLjmks4Tzuzgthdvfsrta
```
