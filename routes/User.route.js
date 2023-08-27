const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');

// Route pour ajouter un nouvel utilisateur (CREATE)
router.post('/User/adduser', (req, res) => {
  const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Prenom || !Mail || !Tel || !Entreprise || !Mdp) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel utilisateur en utilisant le modèle User
  const newUser = new UserModel({Nom,Prenom,Mail,Tel,Entreprise,Mdp,});

  // Sauvegarde du nouvel utilisateur dans la base de données
  newUser.save()
    .then((user) => {
      res.status(201).json(user); // Renvoie l'utilisateur créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});

// Route pour récupérer tous les utilisateurs (READ)
router.get('/Users', (req, res) => {
  UserModel.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucun utilisateurs dans la collection !' });
      });
  });



// Route pour récupérer un utilisateur par ID (READ ID)
router.get('/User/:id', (req, res) => {
    const userId = req.params.id;
    
    UserModel.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Utilisateur non trouvé' });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

// Route pour mettre à jour un utilisateur par ID (UPDATE)
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  UserModel.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Utilisateur introuvable' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer un utilisateur par ID (DELETE)
router.delete('/User/delete/:id', (req, res) => {
  const userId = req.params.id;

  UserModel.findByIdAndDelete(userId)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});

module.exports = router;