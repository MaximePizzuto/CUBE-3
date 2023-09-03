<template>
    <div>
      <h3>Historique des Factures</h3>
      <q-card class="q-ma-md">
        <q-table
          row-key="id_user"
          :rows="factures"
          :columns="columns"
        >
        </q-table>
      </q-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        columns: [
          { name: 'id_user', align: 'left', label: 'N° Facture', field: row => row.id_user },
          { name: 'Montant_HT', align: 'left', label: 'Montant HT', field: row => row.Montant_HT },
          { name: 'Montant_TTC', align: 'left', label: 'Montant TTC', field: row => row.Montant_TTC },
          { name: 'Formule', align: 'left', label: 'Formule', field: row => row.Formule },
          { name: 'Entreprise', align: 'left', label: 'Entreprise', field: row => row.Entreprise },
          { name: 'Description', align: 'left', label: 'Description', field: row => row.Description },
          { name: 'Date_Creation', align: 'left', label: 'Date de Souscription', field: row => row.Date_Creation },
          { name: 'Date_Modification', align: 'left', label: 'Date de Fin', field: row => row.Date_Modification },
        ],
        factures: [
        {
          id_user: 32523554,
          Montant_HT: 4800,
          Montant_TTC: 5760,
          Formule: "EXELLENCE",
          Entreprise: "MonEntreprise",
          Description: "Accès à tous les modules.",
          Date_Creation: "10/12/2022",
          Date_Modification: "10/12/2024",
        },
        {
          id_user: 63464365,
          Montant_HT: 3600,
          Montant_TTC: 4320,
          Formule: "PREVENTION",
          Entreprise: "MonEntreprise",
          Description: "Modules 'Risque', 'Accident', 'Signalement', 'Échéance' et 'Action'.",
          Date_Creation: "15/02/2021",
          Date_Modification: "15/02/2023",
        },
        {
          id_user: 43634634,
          Montant_HT: 2880,
          Montant_TTC: 3456,
          Formule: "PERFORMANCE",
          Entreprise: "MonEntreprise",
          Description: "Module 'Anomalie' ou 'risque' au choix + modules 'Signalement', 'Audit' et 'Action'.",
          Date_Creation: "15/07/2020",
          Date_Modification: "15/07/2022",
        },
        {
          id_user: 25325235,
          Montant_HT: 1920,
          Montant_TTC: 2304,
          Formule: "AMELIORATION",
          Entreprise: "MonEntreprise",
          Description: "1 module au choix + module 'Action'.",
          Date_Creation: "09/08/2019",
          Date_Modification: "09/08/2021",
        },
        {
          id_user: 25353252,
          Montant_HT: 1200,
          Montant_TTC: 1440,
          Formule: "PRIMO",
          Entreprise: "MonEntreprise",
          Description: "1 module au choix sauf le module 'Action'.",
          Date_Creation: "03/11/2018",
          Date_Modification: "03/11/2020",
        },
          {
            id_user: 52353253,
            Montant_HT: 360,
            Montant_TTC: 432,
            Formule: "DUER",
            Entreprise: "MonEntreprise",
            Description: "Réservée au petites entreprises.",
            Date_Creation: "05/07/2017",
            Date_Modification: "05/07/2019",
          },
        ],
      };
    },
  };
  </script>
  