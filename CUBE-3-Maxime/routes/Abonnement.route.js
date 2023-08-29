const express = require('express');
const router = express.Router();
const AbonnementModel = require('../models/Abonnement.model');

// Route pour récupérer tous les Abonnements
router.get('/Abonnements', (req, res) => {
    
  AbonnementModel.find()
      .then((Abonnement) => {
        res.status(200).json(Abonnement);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Abonnement dans la collection !' });
      });
  });



// Route pour récupérer un Abonnement par ID
router.get('/Abonnement/:id', (req, res) => {
    const id_abonnement = req.params.id;
    
    AbonnementModel.findById(id_abonnement)
      .then((Abonnement) => {
        if (!Abonnement) {
          res.status(404).json({ message: 'Abonnement non trouvé' });
        } else {
          res.status(200).json(Abonnement);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });



// Route pour supprimer un Abonnement par ID
router.delete('/Abonnement/delete_Abonnement/:id', (req, res) => {
  const id_abonnement = req.params.id;

  AbonnementModel.findByIdAndDelete(id_abonnement)
  .then((Abonnement) => {
    if (!Abonnement) {
      res.status(404).json({ message: 'Abonnement introuvable' });
    } else {
      res.status(200).json({ message: 'Abonnement supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});



// Route pour ajouter un nouvel Abonnement
router.post('/Abonnement/add_Abonnement', async (req, res) => {
  const { id_user, Nom_user, Tel_user, Date_Crea, Date_modif, Durée_souscription, Prix_TTC, Type_formule } = req.body;
  try {
  // Vérification que les champs requis sont présents dans la requête
  if (!id_user || !Nom_user || !Tel_user || !Date_Crea || !Date_modif || !Durée_souscription || !Prix_TTC || !Type_formule) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Abonnement en utilisant le modèle Abonnement
  const newAbonnement = new AbonnementModel({id_user, Nom_user, Tel_user, Date_Crea, Date_modif, Durée_souscription, Prix_TTC, Type_formule});


  const savedAbonnement = await newAbonnement.save();

    res.status(201).json(savedAbonnement); // Renvoie l'Abonnement créé avec le statut 201 (Created)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
  }

});


router.get('/Abonnement/byUsers/:id_user', async (req, res) => {
    try {
        const abonnement = await AbonnementModel.findOne({ id_user: req.params.id_user });
        if (abonnement) {
            res.json(abonnement);
        } else {
            res.status(404).send('Aucun abonnement trouvé pour cet utilisateur.');
        }
    } catch (error) {
        res.status(500).send('Erreur du serveur.');
    }
});

// Route pour mettre à jour un abonnement par ID utilisateur
router.put('/Abonnement/update_by_user/:id_user', async (req, res) => {
  try {
      const updatedAbonnement = await AbonnementModel.findOneAndUpdate(
          { id_user: req.params.id_user }, 
          req.body, 
          { new: true }  // Cette option renvoie le document mis à jour
      );
      
      if (!updatedAbonnement) {
          res.status(404).send('Aucun abonnement trouvé pour cet utilisateur.');
      } else {
          res.json(updatedAbonnement);
      }
  } catch (error) {
      res.status(500).send('Erreur du serveur.');
  }
});


  module.exports = router;