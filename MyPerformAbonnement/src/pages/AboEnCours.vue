<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ AbonnementEnCours.Nom_user }}</div>
          <div class="text-subtitle1">{{ AbonnementEnCours.Type_formule }}</div>
        </q-card-section>
  
        <q-card-section>
          <q-list>
            <q-item v-if="AbonnementEnCours">
              <q-item-section>Status: Actif</q-item-section>
            </q-item>
            <q-item v-else>
              <q-item-section>Status: Inactif</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Formule d'Abonnement {{ AbonnementEnCours.Type_formule }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Date de souscription: {{ AbonnementEnCours.Date_Crea }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Durée d'abonnement: {{ AbonnementEnCours.Durée_souscription }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Prix par moi: {{ AbonnementEnCours.Prix_TTC }}€</q-item-section>
            </q-item>
            <q-item v-if="AbonnementEnCours">
              <q-item-section>Renouvellement: Automatique</q-item-section>
            </q-item>
            <q-item v-else>
              <q-item-section>Renouvellement: Manuel</q-item-section>
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
        AbonnementEnCours: {}
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
    }
},

mounted() {
  const userId = Cookies.get('userID');
    this.fetchAbonnementByUser(userId);
}

  });

  
  </script>