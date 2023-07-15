var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  mot_de_passe: String
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.mot_de_passe);
};

module.exports = mongoose.model('user', UserSchema);
