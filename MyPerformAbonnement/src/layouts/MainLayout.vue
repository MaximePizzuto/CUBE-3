<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
          MyPerformAbonnement
        </q-toolbar-title>
        
        <div class="text-h7" v-if="isOnHomePage && userobjet.Nom && userobjet.Prenom">{{ userobjet.Nom }} {{ userobjet.Prenom }}</div>
        <div><q-btn v-if="isOnHomePage && userobjet.Nom && userobjet.Prenom" @click="logout" label="Déconnexion" /></div>
        <div><q-btn v-if="!isOnHomePage && !isOnLoginPage && !isOnSignupPage" @click="goToHomePage" label="Accueil" class="q-ml-md"/></div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import api from '../services/api';

export default defineComponent({

  data() {
    return {
      userobjet: [],
    };
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const isOnHomePage = ref(route.path === '/home');
    const isOnLoginPage = ref(route.path === '/login');
    const isOnSignupPage = ref(route.path === '/signup');
    const goToHomePage = () => {
  router.push('/home');  // Assurez-vous que 'home' est le nom de votre route d'accueil.
};



    // Mettez à jour isOnHomePage chaque fois que la route change
    watch(route, () => {
      isOnHomePage.value = route.path === '/home';
      isOnLoginPage.value = route.path === '/login';
      isOnSignupPage.value = route.path === '/signup';

    });


    function logout() {
      Cookies.remove('authToken', { sameSite: 'None', secure: true }); // Supprimez le token d'authentification
      Cookies.remove('userID', { sameSite: 'None', secure: true }); // Supprimez le nom de l'utilisateur
      router.push('/login') // Redirigez l'utilisateur vers la page de connexion
    }

    return {
      isOnHomePage,
      isOnLoginPage,
      isOnSignupPage,
      logout,
      goToHomePage
    };
  },

  mounted() {
    // Exemple avec une requête HTTP à une API (axios est utilisé ici, assurez-vous qu'il est installé) :
      const userID = Cookies.get('userID');

      api.get('/User/' + userID).then(response => {
        this.userobjet = response.data;
      }).catch(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
      });
    },
  
});




</script>


<style scoped>

.q-page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.text-h7 {
  margin-right: 10px;
}

.q-my-md {
  height: 50px;
  width: 50px;
}
</style>
