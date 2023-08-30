<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
  <div v-if="AbonnementEnCours && AbonnementEnCours.Type_formule" class="text-h6">
    Souscripteur : {{ AbonnementEnCours.Nom_user }}
  </div>
  <div v-else class="text-h6">
    Bonjour {{ userobjet.Nom }} {{ userobjet.Prenom }}, vous n'avez pas d'abonnement pour le moment.
  </div>
  <div v-if="AbonnementEnCours && AbonnementEnCours.Type_formule" class="text-subtitle1">
    Type de formule : {{ AbonnementEnCours.Type_formule }}
  </div>
</q-card-section>
  
        <q-card-section>
          <q-list>
            <q-item class="vertical-layout" v-if="AbonnementEnCours.Type_formule">
              <q-item-section class="spaced-section ">Status de l'abonnement : <span class="bold-text">Actif</span></q-item-section>
              <q-item-section class="spaced-section">Formule d'Abonnement : <span class="bold-text">{{ AbonnementEnCours.Type_formule }}</span></q-item-section>
              <q-item-section class="spaced-section">Date de souscription : <span class="bold-text">{{ formatDate(AbonnementEnCours.Date_Crea) }}</span></q-item-section>
              <q-item-section class="spaced-section">Durée d'abonnement : <span class="bold-text">{{ AbonnementEnCours.Durée_souscription }}</span></q-item-section>
              <q-item-section class="spaced-section">Date de fin d'abonnement : <span class="bold-text">{{ calculateEndDate(AbonnementEnCours.Date_Crea) }}</span></q-item-section>
              <q-item-section class="spaced-section">Durée restante : <span class="bold-text">{{ calculateRemainingTime(AbonnementEnCours.Date_Crea) }}</span></q-item-section>
              <q-item-section class="spaced-section">Prix par mois : <span class="bold-text">{{ AbonnementEnCours.Prix_TTC }}€</span></q-item-section>
            </q-item>
            <q-item v-else>
              <q-item-section>Status de l'abonnement : Inactif</q-item-section>
            </q-item>
           
          </q-list>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Cookies from 'js-cookie';
  import api from '../services/api';

  export default defineComponent ({
    data() {
      return {
        AbonnementEnCours: {},
        userobjet: {}
      };
    },


methods: {
    async fetchAbonnementByUser(userID) {
        try {
            const response = await api.get(`/Abonnement/byUsers/${userID}`);
            this.AbonnementEnCours = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'abonnement:', error);
        }
    },

    formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  },

  // méthode pour calculer la date de fin
  calculateEndDate(dateString) {
      const endDate = new Date(dateString);
      endDate.setFullYear(endDate.getFullYear() + 2); // Ajoute 2 ans à la date de création
      return this.formatDate(endDate);
    },

    // Nouvelle méthode pour calculer la durée restante en mois et jours
    calculateRemainingTime(dateString) {
  const today = new Date();
  const endDate = new Date(dateString);
  endDate.setFullYear(endDate.getFullYear() + 2);

  const diffTime = Math.abs(endDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let remainingMonths = 0;
  let remainingDays = 0;

  // Crée une date temporaire qui commence à la date d'aujourd'hui
  let tempDate = new Date(today);

  while (tempDate < endDate) {
    remainingMonths++;
    tempDate.setMonth(tempDate.getMonth() + 1);
  }

  // Retire un mois et calcule les jours restants
  if (tempDate > endDate) {
    remainingMonths--;
    tempDate.setMonth(tempDate.getMonth() - 1);
    remainingDays = Math.ceil((endDate - tempDate) / (1000 * 60 * 60 * 24));
  }

  return `${remainingMonths} mois et ${remainingDays} jours`;
}
},

mounted() {

  const userId = Cookies.get('userID');
  api.get('/User/' + userId).then(response => {
          this.userobjet = response.data;
      }).catch(error => {
          console.error('Erreur lors de la récupération de l utilisateur : ', error);
      });

  
    this.fetchAbonnementByUser(userId);
}

  });

  
  </script>

  <style>

.vertical-layout {
  flex-direction: column;
}

.spaced-section {
  margin-bottom: 1em; /* ou d'autres unités comme 'px', '%' */
}

.bold-text {
  font-weight: bold;
}

</style>