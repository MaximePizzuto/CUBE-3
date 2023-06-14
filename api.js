require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const MongoCRUD = require(__dirname + "/config/db.js")

const mongoCRUD = new MongoCRUD();
mongoCRUD.connect();


// Définir le chemin vers le dossier de distribution de votre application Angular
const angularDistPath = path.join(__dirname, '../front/index/');

// Définir le chemin pour servir les fichiers statiques (CSS, JS, etc.)
app.use(express.static(angularDistPath));

// Gérer toutes les autres routes en renvoyant le fichier index.html de votre application Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
  console.log('http://localhost:3000')
});