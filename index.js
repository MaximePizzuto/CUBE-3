//environemment pour variables
require('dotenv').config({ path: './configs/.env' });
const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const connectToDatabase = require('./configs/server');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());


const userRoutes = require('./routes/recup_user.route');
app.use('/api', userRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
