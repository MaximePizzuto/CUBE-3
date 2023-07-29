<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          MyPerform
        </q-toolbar-title>
        <div v-if="userName && userFirstName">Bonjour, {{ userName }} {{ userFirstName }}!</div>

      </q-toolbar>
    </q-header>

 

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { defineComponent, ref } from 'vue'
import Cookies from 'js-cookie'
import { defineComponent } from 'vue';

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
