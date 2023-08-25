<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6" v-if="AbonnementEnCours">Abonnement en cours: {{ AbonnementEnCours.Type_formule }} </div>
          <div class="text-subtitle1"  v-if="AbonnementEnCours"> {{ AbonnementEnCours.Prix_TTC }} €/mois</div>
        </q-card-section>
      </q-card>
  
      <q-card v-for="(formule, index ) in allFormules" :key="index" class="q-mt-md">
        <q-card-section>
          <div class="text-h5">{{ formule.Nom }}</div>
          <div>{{ formule.Description }}</div>
          <div class="text-subtitle1">{{ formule.PrixFormule }}€/mois</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Choisir cette formule" @click="createSubscription(formule)"/>
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Cookies from 'js-cookie';
  import api from '../services/api';
  import { Dialog } from 'quasar';


  export default defineComponent ({
    data() {
      return {
        userobjet: [],
        allFormules: [],
        AbonnementEnCours: [],
      };
    },
    
    mounted() {
      const userId = Cookies.get('userID');
      this.fetchAbonnementByUser(userId);

      api.get('/Formule').then(response => {
          this.allFormules = response.data;
      }).catch(error => {
          console.error('Erreur lors de la récupération des utilisateurs : ', error);
      });

      const userID = Cookies.get('userID');
      api.get('/User/' + userID).then(response => {
          this.userobjet = response.data;
      }).catch(error => {
          console.error('Erreur lors de la récupération de l utilisateur : ', error);
      });
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

      async createSubscription(formule) {
        
        Dialog.create({
              title: 'Confirmer',
              message: 'Êtes-vous sûr de vouloir choisir cette formule?',
              cancel: true,
              persistent: true
            }).onOk(async() => {

    try {
        // Récupérez les données de l'utilisateur
        const userID = Cookies.get('userID');
       // Supposant que l'ID de l'utilisateur est stocké dans un cookie
        const userResponse = await api.get(`/User/${userID}`);
        
        if (userResponse.status !== 200) {
            console.log("Erreur lors de la récupération des données de l'utilisateur.");
            return;
        }

        const userData = userResponse.data;

        // Créez l'abonnement avec les données de l'utilisateur
        const subscriptionData = {
            id_user: userID,
            Nom_user: userData.Nom + ' ' + userData.Prenom,
            Tel_user: userData.Tel,
            Date_Crea: new Date(),
            Date_modif: new Date(),
            Durée_souscription: '2 ans',
            Prix_TTC: formule.PrixFormule,
            Type_formule: formule.Nom
        };
        console.log(subscriptionData);  // Afficher les données avant de les envoyer
        const response = await api.post('/Abonnement/add_Abonnement', subscriptionData);
        
        if (response.status === 200) {
          this.$q.notify({
        color: 'info',
        position: 'top',
        message: 'Abonnement choisi avec succès',
        icon: 'info'
      });
            console.log("Abonnement créé avec succès!");
        }
    } catch (error) {
        console.log("Erreur lors de la création de l'abonnement: ", error);
    }

      }).onCancel(() => {
      // L'utilisateur a annulé l'action
      this.$q.notify({
        color: 'info',
        position: 'top',
        message: 'Choix de formule annulé',
        icon: 'info'
      });
    });
    },
    },
  });


  </script>