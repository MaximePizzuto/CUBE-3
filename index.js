//environemment pour variables
require('dotenv').config({ path: './configs/.env' });
const PORT = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
//multi origine
const cors = require('cors');
const connectToDatabase = require('./configs/server');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //app use cors allow tous les routes
connectToDatabase();

const routes = require('./routes/index'); //On récupère l'index.js des routes
app.use('/', routes); //Et on utilise les routes


app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
