require('dotenv').config({ path: './configs/.env' });
const API_URI = "mongodb+srv://maxime:2T4VadBrAnmLy0JW@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority";


// Fonction de connexion à la base de données
async function connectToDatabase() {
    try {
            const mongoose = require('mongoose');
            mongoose.connect(API_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connexion à la base de données établie');
            })
            .catch((err) => {
                console.error('Erreur de connexion à la base de données:', err);
            });
        }
        catch (error) {
            console.error('Erreur de connexion à la base de données', error);
            throw error;
        }
};

module.exports = connectToDatabase;