<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
          MyPerformAbonnement
          <template v-if="isAdmin">
            <q-btn class="bouton-admin q-mr-md" @click="goToAdminPage" label="CRUD Admin"/>
          </template>
        </q-toolbar-title>
        
        <template v-if="isOnHomePage && userobjet.Nom && userobjet.Prenom">
          <q-btn @click="goToUserPage" :label="`${userobjet.Nom} ${userobjet.Prenom}`" />
          <q-btn class="bouton-logout" @click="logout" label="Déconnexion" />
        </template>
        
        <q-btn v-else-if="!isOnHomePage && !isOnLoginPage && !isOnSignupPage" @click="goToHomePage" label="Accueil" class="q-ml-md"/>
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
      isAdmin: false,
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
    const goToUserPage = () => {
      router.push('/utilisateur');  // Assurez-vous que 'home' est le nom de votre route d'accueil.
    };
    const goToAdminPage = () =>  {
      router.push('/administrateur');
    }



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
      goToHomePage,
      goToUserPage,
      goToAdminPage
    };
  },

  mounted() {

      const userID = Cookies.get('userID');

      api.get('/User/' + userID).then(response => {
        this.userobjet = response.data;
        this.isAdmin = this.userobjet.is_Admin;
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

.bouton-logout {
  margin-left: 10px;
}

.q-my-md {
  height: 50px;
  width: 50px;
}

.bouton-admin{
  margin-left: 10px;
}
</style>
