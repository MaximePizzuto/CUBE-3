<template>
    <q-page class="flex flex-center">
      <div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
        <div class="text-h6">Inscription</div>
        <q-input outlined v-model="Nom" label="Nom" class="q-mt-md" />
        <q-input outlined v-model="Prenom" label="Prenom" class="q-mt-md" />
        <q-input outlined v-model="Mail" label="E mail" class="q-mt-md" />
        <q-input outlined v-model="Tel" label="Telephone" class="q-mt-md" />
        <q-input outlined v-model="Entreprise" label="Entreprise" class="q-mt-md" />
        <q-input outlined v-model="Mdp" label="Mot de passe" type="password" class="q-mt-md" />
        <q-input outlined v-model="confirmPassword" label="Confirmer mot de passe" type="password" class="q-mt-md" />
        <q-btn label="S'inscrire" color="primary" @click="register" class="q-mt-md" />
      </div>
    </q-page>
  </template>
  
  <script>
import { defineComponent } from 'vue';
import api from '../services/api'; // Import the API service
import Cookies from 'js-cookie';


export default defineComponent({
  data() {
    return {
      Nom: '',
      Prenom: '',
      Mail: '',
      Tel: '',
      Entreprise: '',
      Mdp: '',
      confirmPassword: '',  // Seulement pour SignUpPage.vue
    }
  },
  // ...
  methods: {
    async register() {
      if (this.Mdp !== this.confirmPassword) {
        console.log("Les mots de passe ne correspondent pas");
        return;
      }

      try {
        const response = await api.post('/Users/adduser', { // Replace '/register' with your API's registration endpoint
        Nom: this.Nom,
        Prenom: this.Prenom,  
        Mail: this.Mail, // I'm assuming this.email is the user's email
        Tel: this.Tel,
        Entreprise: this.Entreprise,
        Mdp: this.Mdp,
        });
        
        if (response.data) {
          // Assuming the response has a data field with the user's information
          console.log(`Utilisateur inscrit avec succès: ${response.data}`);
          
          // Assuming the response has a token field with the user's token
          Cookies.set('authToken', response.data.token);
          
          // Redirect the user to the login page
          this.$router.push('/login');
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de l'enregistrement");
      }
    },
  },
});
</script>
