<template>
    <q-page class="flex flex-center">
      <div>
        <div class="text-h6" v-if="userName && userFirstName">Bonjour, {{ userName }} {{ userFirstName }}!</div>
        <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
      </div>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Cookies from 'js-cookie';

 export default defineComponent ({
  data() {
    return {
      userName: '',
      userFirstName: ''
    };
  },
  created() {
    this.userName = Cookies.get('userName'); // Récupérez le nom de l'utilisateur
    this.userFirstName = Cookies.get('userFirstName'); // Récupérez le prénom de l'utilisateur
  }
});
  </script>
  