<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Formule en cours: {{ currentFormule.nom }}</div>
          <div class="text-subtitle1">{{ currentFormule.prix }}€/mois</div>
        </q-card-section>
      </q-card>
  
      <q-card v-for="formule in formules" :key="formule.nom" class="q-mt-md">
        <q-card-section>
          <div class="text-h5">{{ formule.nom }}</div>
          <div>{{ formule.description }}</div>
          <div class="text-subtitle1">{{ formule.prix }}€/mois</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Choisir cette formule" @click="choisirFormule(formule)"/>
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentFormule: {
          nom: "DUER",
          prix: 15
        },
        formules: [
          {
            nom: "DUER",
            description: "Réservée au petites entreprises.",
            prix: 15
          },
          {
            nom: "PRMO",
            description: "1 module au choix sauf le module 'Action'.",
            prix: 50
          },
          {
            nom: "AMELIORATION",
            description: "1 module au choix + module 'Action'.",
            prix: 80
          },
          {
            nom: "PERFORMANCE",
            description: "Module 'Anomalie' ou 'risque' au choix + modules 'Signalement', 'Audit' et 'Action'.",
            prix: 120
          },
          {
            nom: "PREVENTION",
            description: "Modules 'Risque', 'Accident', 'Signalement', 'Échéance' et 'Action'.",
            prix: 150
          },
          {
            nom: "EXCELLENCE",
            description: "Accès à tous les modules.",
            prix: 200
          }
        ]
      };
    },
    methods: {
      choisirFormule(formule) {
        this.currentFormule = formule;
        // Ici, vous pouvez également mettre à jour les détails d'abonnement en conséquence
        // par exemple, en utilisant une requête API ou en mettant à jour un store Vuex.
      }
    }
  };
  </script>