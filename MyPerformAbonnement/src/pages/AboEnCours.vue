<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ details.nomSouscripteur }}</div>
          <div class="text-subtitle1">{{ details.nomFormule }}</div>
        </q-card-section>
  
        <q-card-section>
          <q-list>
            <q-item v-if="details.abonnementActif">
              <q-item-section>Status: Actif</q-item-section>
            </q-item>
            <q-item v-else>
              <q-item-section>Status: Inactif</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Date de souscription: {{ details.dateSouscription }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Durée restante: {{ details.dureeRestante }} jours</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Nombre de modules: {{ details.modules.length }}</q-item-section>
            </q-item>
            <q-item v-for="module in details.modules" :key="module">
              <q-item-section>Module: {{ module }}</q-item-section>
            </q-item>
            <q-item v-if="details.renouvellementAutomatique">
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
  export default {
    data() {
      return {
        details: {
          nomSouscripteur: "Jean Dupont",
          nomFormule: "Formule Premium",
          abonnementActif: true,
          dateSouscription: "2023-08-18",
          dureeRestante: 365,
          modules: ["anomalie", "risque", "audit"],
          renouvellementAutomatique: true
        }
      };
    }
  };
  </script>