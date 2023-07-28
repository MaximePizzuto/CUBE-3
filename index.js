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
//app use cors
app.use(cors());


connectToDatabase();

const userRoutes = require('./routes/User.route'); //user
// const userEntreprise = require('./routes/Entreprise.route'); //Entreprise
// const userAbonnement = require('./routes/Abonnement.route'); // Abonnement

app.use('/', userRoutes); //user
// app.use('/', userEntreprise); //Entreprise
// app.use('/', userAbonnement); //Abonnement



app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
