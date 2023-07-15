var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/register', async function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.mot_de_passe, 8);
  
    try {
        var user = await User.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mot_de_passe: hashedPassword
        })

        var token = jwt.sign({ id: user._id }, 'mySecret', { expiresIn: 86400 });
        req.session.token = token;
        res.status(200).send({ auth: true, token: token });
    } catch(err) {
        res.status(500).send('There was a problem registering the user.');
    }
});

router.post('/login', async function (req, res) {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send('No user found.');
      }
  
      var isMatch = user.comparePassword(req.body.mot_de_passe);
      if (!isMatch) return res.status(401).send({ auth: false, token: null });
  
      var token = jwt.sign({ id: user._id }, 'mySecret', { expiresIn: 86400 });
      req.session.token = token;
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      res.status(500).send('Error on the server.');
    }
  });

router.get('/me', async function(req, res) {
    var token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    try {
        var decoded = await jwt.verify(token, 'mySecret');

        var user = await User.findById(decoded.id, { mot_de_passe: 0 });
        if (!user) return res.status(404).send("No user found.");
  
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
});

module.exports = router;
