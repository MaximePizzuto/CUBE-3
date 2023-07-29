<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          MyPerform
        </q-toolbar-title>
        <div><q-btn v-if="isOnHomePage && userName && userFirstName" @click="logout" label="Déconnexion" /></div>

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
      logout
    };
  }
});
</script>
