<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section v-if="AbonnementEnCours">
            <div class="text-h6">Abonnement en cours de {{ userobjet.Prenom }} {{ userobjet.Nom }}: formule {{ AbonnementEnCours.Type_formule }}</div>
            <div class="text-subtitle1">{{ AbonnementEnCours.Prix_TTC }} €/mois</div>
            
            <!-- Section modifiée pour le bouton -->
            <div class="text-right">
                <q-btn label="Supprimer l'abonnement" color="negative" @click="deleteSubscription" class="q-mr-md" />
            </div>
        </q-card-section>
      </q-card>
  
      <q-card v-for="(formule, index ) in filteredFormules" :key="index" class="q-mt-md">
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

      api.get('/User/' + userId).then(response => {
          this.userobjet = response.data;
      }).catch(error => {
          console.error('Erreur lors de la récupération de l utilisateur : ', error);
      });
    },

    computed: {
    filteredFormules() {
        if (this.AbonnementEnCours && this.AbonnementEnCours.Prix_TTC) {
            return this.allFormules.filter(formule => formule.PrixFormule > this.AbonnementEnCours.Prix_TTC);
        }
        return this.allFormules;
      }
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
      const userID = Cookies.get('userID');
      let existingAbonnement = null;
      try {
          // Récupérez l'abonnement existant (s'il y en a un)
          existingAbonnement = await api.get(`/Abonnement/byUsers/${userID}`);
        } catch (error) {
          // Gérez les erreurs ici si nécessaire
          console.log("Erreur lors de la recherche de l'abonnement utilisateur: ", error)
      }
          // Préparez le message de confirmation
          const confirmationMessage = existingAbonnement && existingAbonnement.data
          ? 'Êtes-vous sûr de vouloir changer votre abonnement pour cette formule?'
          : 'Êtes-vous sûr de vouloir choisir cette formule?';


          Dialog.create({
          title: 'Confirmer',
          message: confirmationMessage,
          cancel: true,
          persistent: true
      }).onOk(async () => {
        
        //CREATION ABONNEMENT AU CHOIX DE L'UTILISATEUR
        try {
          // Récupérez les données de l'utilisateur
          const userResponse = await api.get(`/User/${userID}`);
          const userData = userResponse.data;

          // Préparez les données de l'abonnement
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

          let response;
          let notificationMessage;

          // Si l'utilisateur a déjà un abonnement, mettez-le à jour
          if (existingAbonnement && existingAbonnement.data) {
                  response = await api.put(`/Abonnement/update_by_user/${userID}`, subscriptionData);
                  notificationMessage = 'Abonnement mis à jour avec succès';
              } else {
                  // Sinon, créez un nouvel abonnement
                  response = await api.post('/Abonnement/add_Abonnement', subscriptionData);
                  notificationMessage = 'Abonnement créé avec succès';
              }

          if (response.status === 200 || response.status === 201) {
              this.$q.notify({
                  color: 'info',
                  position: 'top',
                  message: notificationMessage,
                  icon: 'info'
              });
              // Mettez à jour l'abonnement actuel affiché sur la vue
              this.AbonnementEnCours = response.data;
          }
            } catch (error) {
                console.log("Erreur lors de la mise à jour de l'abonnement: ", error);
            }
            

          //CREATION DE LA FACTURE EN FONCTION DE l'ABONNEMENT id_user, Montant_TTC, Montant_HT, Formule, Entreprise, Description, Date_Creation, Date_Modificatio
            try {
          // Préparez les données de la facture
          const factureData = {
              id_user: userID,
              Montant_HT: this.AbonnementEnCours.Prix_TTC * 24,
              Montant_TTC: (this.AbonnementEnCours.Prix_TTC * 24) * 1.2,
              Formule: this.AbonnementEnCours.Type_formule,
              Entreprise: this.userobjet.Entreprise,
              Description: formule.Description,
              Date_Creation: new Date(),
              Date_Modification: new Date()
          };
          let response;
                  //Creation de la facture en BDD
                  
            response = await api.post('/Factures/addFacture', factureData);
            notificationMessage = 'Votre facture a été créé avec succès';

          if (response.status === 200 || response.status === 201) {
              this.$q.notify({
                  color: 'info',
                  position: 'top',
                  message: notificationMessage,
                  icon: 'info'
              });
          }
            } catch (error) {
                console.log("Erreur lors de la mise à jour de la facture: ", error);
            }

        }).onCancel(() => {
            // L'utilisateur a annulé l'action
            this.$q.notify({
                color: 'info',
                position: 'top',
                message: 'Action annulée',
                icon: 'info'
            });
            })
      },

      async deleteSubscription() {
        // Affichez la fenêtre de confirmation
        Dialog.create({
            title: 'Confirmer',
            message: 'Êtes-vous sûr de vouloir supprimer votre abonnement en cours?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            // Si l'utilisateur confirme la suppression, procédez à la suppression de l'abonnement
            try {
                const userID = Cookies.get('userID');
                const abonnement = await api.get(`/Abonnement/byUsers/${userID}`);
                
                if (abonnement && abonnement.data) {
                    await api.delete(`/Abonnement/delete_Abonnement/${abonnement.data._id}`);
                    
                    this.$q.notify({
                        color: 'info',
                        position: 'top',
                        message: 'Abonnement supprimé avec succès',
                        icon: 'info'
                    });

                    // Mettez à jour l'abonnement actuel affiché sur la vue (le supprimer de la vue)
                    this.AbonnementEnCours = null;
                }
            } catch (error) {
                console.log("Erreur lors de la suppression de l'abonnement: ", error);
            }
        }).onCancel(() => {
            // L'utilisateur a annulé l'action
            this.$q.notify({
                color: 'info',
                position: 'top',
                message: 'Suppression annulée',
                icon: 'info'
            });
        });
      },
    },
  });


  </script>