<template>
    <q-page class="flex flex-center">
      <div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
        <div class="text-h6">Connexion</div>
        <q-input outlined v-model="username" label="Nom d'utilisateur" class="q-mt-md" />
        <q-input outlined v-model="password" label="Mot de passe" type="password" class="q-mt-md" />
        <q-btn label="Se connecter" color="primary" @click="login" class="q-mt-md" />
        <q-btn label="Inscription" color="secondary" @click="$router.push('/signup')" class="q-mt-md" />
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        console.log(`Logging in with username: ${this.username} and password: ${this.password}`);
        // Votre code d'authentification irait ici
      },
    },
  };
  </script>
  