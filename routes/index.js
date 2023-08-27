const express = require('express');
const router = express.Router();

const userRoutes = require('./User.route');
const paiementRoutes = require('./Paiement.route');
const formuleRoutes = require('./Formule.route');
const factureRoutes = require('./Facture.route');
const entrepriseRoutes = require('./Entreprise.route');
const abonnementRoutes = require('./Abonnement.route');

router.use(userRoutes);
router.use(paiementRoutes);
router.use(formuleRoutes);
router.use(factureRoutes);
router.use(entrepriseRoutes);
router.use(abonnementRoutes);

module.exports = router;
