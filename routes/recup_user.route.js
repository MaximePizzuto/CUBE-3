const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Route pour récupérer tous les utilisateurs
router.get('/User', (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

// Route pour récupérer un utilisateur par ID
router.get('/User/:id', (req, res) => {
    const userId = req.params.id;
    
    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Utilisateur introuvable' });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

  module.exports = router;