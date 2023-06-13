const express = require('express');
const path = require('path');
//mongo const
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://maxime:2T4VadBrAnmLy0JW@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('mongonode');
    const titles = database.collection('test');

    const doc = { title: "batman", description: "Batman 1 : le premier quoi !"};
    const result = await titles.deleteOne(doc);
    console.log(
   `A document was deleted with the _id: ${result.deletedCount}`,
);

  } finally {
    // Ensures that the client wi0ll close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const app = express();

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
