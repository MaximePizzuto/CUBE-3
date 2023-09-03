<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">FACTURE DE L'ABONNEMENT EN COURS</div>
          <q-card>
            <q-btn @click="downloadFacturePDF" label="Exporter en PDF" color="primary" class="bouton-PDF"/>
            <q-btn @click="downloadFactureCSV" label="Exporter en CSV" color="primary" class="bouton-CSV"/>
          </q-card>
          
        </div>
        <div class="text-subtitle1">Formule de l'abonnement: {{ FactureEnCours.Formule }}</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item v-if="FactureEnCours.Formule">
            <q-item-section>Status: Actif</q-item-section>
          </q-item>
          <q-item v-else>
            <q-item-section>Status: Inactif</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Montant HT:  {{FactureEnCours.Montant_HT }}€</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Montant TTC: {{ FactureEnCours.Montant_TTC }}€</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Date d'émission: {{ formatDate(FactureEnCours.Date_Creation) }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Description: {{ FactureEnCours.Description }}</q-item-section>
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
      FactureEnCours: {},
    };
  },


methods: {
  async fetchFactureByUser(userID) {
      try {
          const response = await api.get(`/Factures/byUsers/${userID}`);
          this.FactureEnCours = response.data;
      } catch (error) {
          console.error('Erreur lors de la récupération de la facture:', error);
      }
  },

  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  },

  async downloadFacturePDF() {
      try {
        const idFacture = this.FactureEnCours._id;
        const response = await api.get(`/download/facture/${idFacture}`, { responseType: 'blob' });

        // Créer un lien invisible pour déclencher le téléchargement
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `facture-${idFacture}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Nettoyer
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Erreur lors du téléchargement de la facture:', error);
      }
    },

    async downloadFactureCSV() {
      try {
        const idFacture = this.FactureEnCours.id_user;
        const response = await api.get(`/download/facture-csv/${idFacture}`, { responseType: 'blob' });

        // Créer un lien invisible pour déclencher le téléchargement
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `facture-${idFacture}.csv`);
        document.body.appendChild(link);
        link.click();

        // Nettoyer
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Erreur lors du téléchargement de la facture:', error);
      }
    },
},



mounted() {
const userId = Cookies.get('userID');
  this.fetchFactureByUser(userId);
}

});


</script>

<style>

.bouton-PDF {
  margin-right: 10px;
}
</style>