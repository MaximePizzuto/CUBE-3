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
//app use cors allow tous les routes
app.use(cors({origin: 'http://localhost:9000'}));


connectToDatabase();


const userAbonnement = require('./routes/Abonnement.route'); // Abonnement
const userEntreprise = require('./routes/Entreprise.route'); //Entreprise
const userFacture = require('./routes/Facture.route'); // Facture
const Formule = require('./routes/Formule.route'); // Formule
const userRoutes = require('./routes/User.route'); //user

app.use('/', userAbonnement); //Abonnement
app.use('/', userEntreprise); //Entreprise
app.use('/', userFacture); //Facture
app.use('/', Formule); //Formule
app.use('/', userRoutes); //user






app.listen(PORT, () => {
  console.log(`-------------------------------------------------
Serveur en cours d'exécution sur http://localhost:${PORT}
-------------------------------------------------`);
});



/* ------------ ANCIEN CODE ---------
//environemment pour variables
require('dotenv').config({ path: './configs/.env' });
//const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
//multi origine
const cors = require('cors');
const connectToDatabase = require('./configs/server');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app use cors allow tous les routes
app.use(cors({
  origin: 'http://localhost:9000' //URL de votre application Quasar
}));


connectToDatabase();

const userRoutes = require('./routes/User.route'); //user
// const userEntreprise = require('./routes/Entreprise.route'); //Entreprise
// const userAbonnement = require('./routes/Abonnement.route'); // Abonnement

app.use('/', userRoutes); //user
// app.use('/', userEntreprise); //Entreprise
// app.use('/', userAbonnement); //Abonnement



app.listen(5000, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:5000`);
});
*/
