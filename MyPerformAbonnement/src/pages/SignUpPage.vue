<template>
    <q-page class="flex flex-center">
      <div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
        <div class="text-h6">Inscription</div>
        <q-input outlined v-model="username" label="Nom d'utilisateur" class="q-mt-md" />
        <q-input outlined v-model="password" label="Mot de passe" type="password" class="q-mt-md" />
        <q-input outlined v-model="confirmPassword" label="Confirmer mot de passe" type="password" class="q-mt-md" />
        <q-btn label="S'inscrire" color="primary" @click="register" class="q-mt-md" />
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      register() {
        if (this.password !== this.confirmPassword) {
          console.log("Les mots de passe ne correspondent pas");
          return;
        }
        console.log(`Inscription avec le nom d'utilisateur: ${this.username} et le mot de passe: ${this.password}`);
        // Votre code d'enregistrement irait ici
      },
    },
  };
  </script>
  