# Quasar App (myperformabonnement)

Installer et lancer un projet Quasar


## Installer les dependances
```bash
npm install
```
ATTENTION !!! Pour que les verifications à l'inscription fonctionnent j'ai ajouté le package express-validator
A installer avec npm install express-validator en BackEnd

## Installer Quasar et quasarCLI.
```bash
npm install -g @quasar/cli
```


### Installer une appli Quasar de base
```bash
npm init quasar

Option: 
Name MyPerformAbonnement
without Typscript
Without JSX
Quasar CLI with Vite
With Linter
With Prettier
```


### Lancer l'application en mode développement (hot-code reloading, error reporting, etc.)
### Depuis le repertoire créée lors de l'étape précédente
```bash
quasar dev / npm run dev
```





### Build l'application pour la production
```bash
quasar build
```


### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
