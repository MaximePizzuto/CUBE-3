require('dotenv').config({ path: './configs/.env' });
const API_URI = process.env.API_URI;


// Fonction de connexion à la base de données
async function connectToDatabase() {
    try {
            const mongoose = require('mongoose');
            mongoose.connect(API_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('++ Connexion à la base de données établie');
            })
            .catch((err) => {
                console.error('/!\ Erreur de connexion à la base de données /!\ :', err);
            });
        }
        catch (error) {
            console.error('/!\ Erreur de connexion à la base de données /!\ :', err);
            throw error;
        }
};

module.exports = connectToDatabase;