<template>
    <q-page class="flex flex-center">
      <div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
        <div class="text-h6">Inscription</div>
        <q-input outlined v-model="Nom" label="Nom" class="q-mt-md" />
        <q-input outlined v-model="Prenom" label="Prenom" class="q-mt-md" />
        <q-input outlined v-model="Mail" label="E-mail" type="email" class="q-mt-md" :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Format de mail invalide']" />
        <q-input outlined v-model="Tel" label="Telephone" class="q-mt-md" />
        <q-input outlined v-model="Entreprise" label="Entreprise" class="q-mt-md" />
        <q-input outlined v-model="Mdp" label="Mot de passe" type="password" class="q-mt-md" :rules="[val => !!val || 'Password is required', val => val.length >= 5 || 'Votre mot de passe doit contenir au moins 5']" />
        <q-input outlined v-model="confirmPassword" label="Confirmer mot de passe" type="password" class="q-mt-md" />
        <q-btn label="S'inscrire" color="primary" @click="register" class="q-mt-md" />
      </div>
    </q-page>
  </template>
  
  <script>
import { defineComponent } from 'vue';
import api from '../services/api'; // Import the API service
import { Dialog } from 'quasar';


export default defineComponent({
  data() {
    return {
      Nom: '',
      Prenom: '',
      Mail: '',
      Tel: '',
      Entreprise: '',
      Mdp: '',
      confirmPassword: '', 
    }
  },
 
  methods: {
    async register() {
      if (this.Mdp !== this.confirmPassword) {
        this.$q.notify({
        color: 'negative',
        position: 'top',
        message: 'Les mots de passe ne correspondent pas.',
        icon: 'report_problem'
      });
        console.log("Les mots de passe ne correspondent pas");
        return;
      }

      Dialog.create({
              title: 'Confirmer',
              message: 'Êtes-vous sûr que vos informations sont correctes ?',
              cancel: true,
              persistent: true
            }).onOk(async() => {

      try {
        const response = await api.post('/User/signup', { // Replace '/register' with your API's registration endpoint
        Nom: this.Nom,
        Prenom: this.Prenom,  
        Mail: this.Mail, // I'm assuming this.email is the user's email
        Tel: this.Tel,
        Entreprise: this.Entreprise,
        Mdp: this.Mdp,
        });
        
        if (response.status === 201) {
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Compte créé avec succès!',
            icon: 'check'
          });
          this.$router.push('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Si l'email est déjà utilisé
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Email déjà utilisé!',
            icon: 'error'
          });
        } else {
          // Autres erreurs
          console.log("Une erreur s'est produite lors de l'enregistrement");
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Une erreur s\'est produite lors de l\'enregistrement',
            icon: 'error'
          });
        }
      }
    }
)}
  }
});
</script>
