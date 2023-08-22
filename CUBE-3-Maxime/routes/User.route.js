/*
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');




// Route pour récupérer tous les utilisateurs
router.get('/Users', (req, res) => {
    
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucun utilisateurs dans la collection !' });
      });
  });



// Route pour récupérer un utilisateur par ID
router.get('/User/:id', (req, res) => {
    const userId = req.params.id;
    
    User.findById(userId)
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



// Route pour supprimer un utilisateur par ID
router.delete('/User/delete/:id', (req, res) => {
  const userId = req.params.id;

User.findByIdAndDelete(userId)
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



// Route pour ajouter un nouvel utilisateur
router.post('/User/signup', async (req, res) => {
  const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

  try {
    // Vérification que les champs requis sont présents dans la requête
    if (!Nom || !Prenom || !Mail || !Tel || !Entreprise || !Mdp) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(Mdp, 10);

    // Création d'un nouvel utilisateur en utilisant le modèle User
    const newUser = new User({
      Nom,
      Prenom,
      Mail,
      Tel,
      Entreprise,
      Mdp: hashedPassword,
    });

    // Sauvegarde du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Renvoie l'utilisateur créé avec le statut 201 (Created)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
  }
});

// Route pour connecter un utilisateur
router.post('/User/login', async (req, res) => {
  const { Mail, Mdp } = req.body;

  try {
    const user = await User.findOne({ Mail });

    if (!user) {
      return res.status(401).json({ message: 'Adresse e-mail non trouvée' });
    }

    const isPasswordValid = await bcrypt.compare(Mdp, user.Mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
    }

    res.json({ message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



------------------ANCIEN CODE -----------------------*/
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Pour le hachage du mot de passe
const jwt = require('jsonwebtoken'); // Pour la création du token JWT
const { check, validationResult } = require('express-validator');

const jwtSecret = 'your_jwt_secret'; //


// Route pour l'inscription
router.post('/User/signup',
[
  // vérifiez que l'email n'est pas vide et qu'il a un format correct
  check('Mail').isEmail().withMessage('Invalid email format'),
  
  // vérifiez que le mot de passe n'est pas vide et qu'il a au moins 5 caractères
  check('Mdp').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  check('Nom').notEmpty().withMessage('Ce champs est requis'),
  check('Prenom').notEmpty().withMessage('Ce champs est requis'),
  check('Tel').notEmpty().withMessage('Ce champs est requis'),
  check('Entreprise').notEmpty().withMessage('Ce champs est requis'),
  // vous pouvez ajouter plus de vérifications ici pour les autres champs de votre formulaire
  
],
 async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ Mail: req.body.Mail });
    if (user) {
      return res.status(400).json({ message: 'Votre mail est déjà pris' });
    }

  const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

  // Hachez le mot de passe avant de le stocker
  const hashedPassword = await bcrypt.hash(Mdp, 10);

  const newUser = new User({ Nom, Prenom, Mail, Tel, Entreprise, Mdp: hashedPassword });

  newUser.save()
    .then((user) => {
      // Créez un token pour le nouvel utilisateur
      const token = jwt.sign({ _id: user._id }, jwtSecret);

      res.status(201).json({ user, token });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour la connexion
router.post('/User/login', async (req, res) => {
  const { Mail, Mdp } = req.body;

  const user = await User.findOne({ Mail });
  if (!user) {
    return res.status(400).json({ message: 'Email incorrect' });
  }

  const isPasswordCorrect = await bcrypt.compare(Mdp, user.Mdp);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  // Créez un token pour l'utilisateur connecté
  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return res.json({ user, token });
});




  module.exports = router;
  
 