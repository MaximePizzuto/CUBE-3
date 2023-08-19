<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Facture</div>
          <div>Nom de l'entreprise: {{ facture.nomEntreprise }}</div>
          <div>Nom du souscripteur: {{ facture.nomSouscripteur }}</div>
          <div>Adresse de facturation: {{ facture.adresseFacturation }}</div>
          <div>Type de formule: {{ facture.typeFormule }}</div>
          <div>Date de souscription: {{ facture.dateSouscription }}</div>
          <div>Date de paiement: {{ facture.datePaiement }}</div>
          <div>Montant TTC: {{ facture.montantTTC }}€</div>
          <div>Montant Hors taxe: {{ facture.montantHT }}€</div>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn label="Exporter en PDF" @click="exporterPDF" />
          <q-btn label="Exporter en CSV" @click="exporterCSV" />
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script>

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Papa from "papaparse";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


  export default {
    data() {
      return {
        facture: {
          nomEntreprise: "Entreprise XYZ",
          nomSouscripteur: "Jean Dupont",
          adresseFacturation: "123 rue de Paris, 75000 Paris",
          typeFormule: "EXCELLENCE",
          dateSouscription: "2023-08-18",
          datePaiement: "2023-08-19",
          montantTTC: 4800, // 200€/mois * 24 mois
          montantHT: 4000  // Hypothèse: taux de TVA à 20%
        }
      };
    },
    methods: {
      exporterPDF() {
        const docDefinition = {
        content: [
          { text: 'Facture', fontSize: 18, bold: true, margin: [0, 0, 0, 8] },
          `Nom de l'entreprise: ${this.facture.nomEntreprise}`,
          `Nom du souscripteur: ${this.facture.nomSouscripteur}`,
          `Adresse de facturation: ${this.facture.adresseFacturation}`,
            `Type de formule: ${this.facture.typeFormule}`,
            `Date de souscription: ${this.facture.dateSouscription}`,
            `Date de paiement: ${this.facture.datePaiement}`,
            `Montant TTC: ${this.facture.montantTTC}€`,
          `Montant Hors taxe: ${this.facture.montantHT}€`
        ]
      };
      pdfMake.createPdf(docDefinition).download("facture.pdf");
    },


      exporterCSV() {
        const csvData = [
        ["Nom de l'entreprise", this.facture.nomEntreprise],
        ["Nom du souscripteur", this.facture.nomSouscripteur],
        ["Adresse de facturation", this.facture.adresseFacturation],
    ["Type de formule", this.facture.typeFormule],
    ["Date de souscription", this.facture.dateSouscription],
    ["Date de paiement", this.facture.datePaiement],
    ["Montant TTC", `${this.facture.montantTTC}€`],
        ["Montant Hors taxe", `${this.facture.montantHT}€`]
      ];
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "facture.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    }
  };
  </script>