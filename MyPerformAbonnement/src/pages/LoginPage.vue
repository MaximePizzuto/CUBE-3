<template>
    <q-page class="flex flex-center">
      <div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
        <div class="text-h6">Connexion</div>
        <q-input outlined v-model="Mail" label="E mail" class="q-mt-md" />
        <q-input outlined v-model="Mdp" label="Mot de passe" type="password" class="q-mt-md" />
        <q-btn label="Se connecter" color="primary" @click="login" class="q-mt-md" />
        <q-btn label="Inscription" color="secondary" @click="$router.push('/signup')" class="q-mt-md" />
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
      Mail: '',
      Mdp: '',
    }
  },
    // ...
    methods: {
      async login() {
        try {
          const response = await api.post('/User/login', {
            Mail: this.Mail,
            Mdp: this.Mdp,
          });
          
          if (response.data) {
            // Assuming the response has a data field with the user's information
            console.log(`Utilisateur connecté avec succès: ${response.data.user}`);
            
            // Assuming the response has a token field with the user's token
            Cookies.set('authToken', response.data.token, { sameSite: 'None', secure: true });
            
            //ON stock l'id d'utilisateur pour récupérer ses données.
            Cookies.set('userID', response.data.user._id, { sameSite: 'None', secure: true })

            // Redirect the user to the home page
            this.$router.push('/home');
          }
        } catch (error) {
          console.log("Une erreur s'est produite lors de la connexion");
        }
      },
    },
  });
  </script>
  
  