<template>
    <q-page class="home-container">
      <div class="message-bienvenue">
        <div class="text-h6" v-if="userName && userFirstName">Bienvenue {{ userName }} {{ userFirstName }}, ici vous pouvez gérer tous les détails concernant votre abonnement</div>
      </div>
      <div class="container-logo">
       
      </div>
        <!-- Grille 2x4 -->
    <div class="grid-container">
      <q-row class="grid-row" wrap>
  <q-col v-for="item in gridItems" :key="item.text" cols="3" class="grid-cell" :style="{ backgroundColor: item.bgColor }">
    
    <div class="cell-content text-center">
      <q-btn :to="item.route" flat block><span class="material-icons cell-icon">{{ item.iconName }}</span></q-btn>
      
      <div class="cell-text">{{ item.text }}</div>
    </div>
  </q-col>
</q-row>
    </div>
      
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Cookies from 'js-cookie';

 export default defineComponent ({
  data() {
    return {
      user: [],
      userName: '',
      userFirstName: '',
      gridItems: [
      { text: 'Abonnement en cours', iconName: 'card_membership', bgColor: 'darkblue', route: '/aboencours' },
      { text: 'Voir ma facture', iconName: 'description', bgColor: 'darkgreen', route: '/mafacture' },
      { text: 'Mon historique', iconName: 'history', bgColor: 'red', route: '/monhistorique' },
      { text: 'Gérer mon abonnement', iconName: 'build', bgColor: 'purple', route: '/gerermonabo' },

      // ... ajoutez autant d'éléments que nécessaire
    ]
    };
  },
  created() {
    this.userName = Cookies.get('userName'); // Récupérez le nom de l'utilisateur
    this.userFirstName = Cookies.get('userFirstName'); // Récupérez le prénom de l'utilisateur
  }
});
  </script>
  

  <style scoped>

.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
}

.q-page {
    height: 100%;
}
  .page-content {
    width: 100%;
    max-width: 960px; /* Ajustez cette valeur selon vos besoins */
  }

  .greeting-message {
    margin-bottom: 20px;
  }

  .logo-image {
    margin-bottom: 20px;
  }

  .grid-container {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .grid-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 150px;
  }

  .grid-cell {
    flex: 1;
    width: 300px; /* Ajustez selon la taille souhaitée pour les cases carrées */
  height: 300px;
  margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc; /* Pour visualiser les cases */
  }

  .cell-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container-logo {
    width: 5%;
  }

  .grid-cell .q-btn {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-icons.cell-icon {
  font-size: 3em;
  color: white;
}

.cell-text {
  color: white;
  font-size: 1.5em;
}

.message-bienvenue {
  margin-bottom: 40px;
}
</style>