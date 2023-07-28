<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          MyPerform
        </q-toolbar-title>
        <!-- <div v-if="userEmail">{{ userEmail }}</div> -->
        <div>Abonnement</div>
      </q-toolbar>
    </q-header>

 

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Cookies from 'js-cookie'



// export default defineComponent({
  // name: 'MainLayout',
  //setup() {
//     const userEmail = ref(Cookies.get('userEmail') || '')

//     return {
//       userEmail
//     }
//   }

// })
</script>
