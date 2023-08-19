<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/my-perform.png" alt="Logo" class="q-my-md"></q-img>
          MyPerformAbonnement
        </q-toolbar-title>
        
        <div class="text-h7" v-if="isOnHomePage && userName && userFirstName">{{ userName }} {{ userFirstName }}</div>
        <div><q-btn v-if="isOnHomePage && userName && userFirstName" @click="logout" label="Déconnexion" /></div>
        <div><q-btn v-if="userName && userFirstName && !isOnHomePage" @click="goToHomePage" label="Accueil" class="q-ml-md"/></div>
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

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userName = ref(Cookies.get('userName'));
    const userFirstName = ref(Cookies.get('userFirstName'));
    const isOnHomePage = ref(route.path === '/home');
    const goToHomePage = () => {
  router.push('/home');  // Assurez-vous que 'home' est le nom de votre route d'accueil.
};

    // Mettez à jour isOnHomePage chaque fois que la route change
    watch(route, () => {
      isOnHomePage.value = route.path === '/home';
    });

    function logout() {
      Cookies.remove('authToken', { sameSite: 'None', secure: true }); // Supprimez le token d'authentification
      Cookies.remove('userName', { sameSite: 'None', secure: true }); // Supprimez le nom de l'utilisateur
      Cookies.remove('userFirstName', { sameSite: 'None', secure: true }); // Supprimez le prénom de l'utilisateur
      router.push('/login'); // Redirigez l'utilisateur vers la page de connexion
    }

    return {
      userName,
      userFirstName,
      isOnHomePage,
      logout,
      goToHomePage
    };
  }
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
