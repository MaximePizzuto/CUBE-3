<template>
    <div class="q-pa-md container">
      <h4>Vos informations</h4>
  
      <q-card class="my-card">
        <q-card-section>
    <q-spinner-hourglass v-if="loading" size="40px" />
    <div v-else class="q-gutter-md">
      <div class="q-pb-md" v-for="field in Object.keys(user)" :key="field">
        <div v-if="field !== '_id' && field !== '__v' && field !== 'Mdp'" class="row justify-between">
          <div>
            <label class="label-style">{{ field }} : </label>{{ user[field] }}
          </div>
          <div class="q-ml-auto">
            <q-btn color="primary" label="Modifier" @click="enableEdit(field)" />
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn color="warning" label="Changer le mot de passe" @click="enablePasswordChange" />
      </div>
    </div>
  </q-card-section>
      </q-card>
  
        <q-dialog v-model="editing">
      <q-card>
        <q-card-section>
          <h5>Modification du champ {{ editingField }}</h5>
          <q-input filled v-model="newValue"></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup @click="cancelEdit" />
          <q-btn flat label="Confirmer" color="primary" v-close-popup @click="updateField" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
    <q-dialog v-model="changingPassword">
      <q-card>
        <q-card-section>
          <h5>Changement de mot de passe</h5>
          <q-input type="password" filled v-model="newPassword" placeholder="Nouveau mot de passe" />
          <q-input type="password" filled v-model="confirmPassword" placeholder="Confirmer le nouveau mot de passe" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup @click="cancelPasswordChange" />
          <q-btn flat label="Changer" color="primary" v-close-popup @click="updatePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </template>
  
  <script>
    import { defineComponent } from 'vue';
  import Cookies from 'js-cookie';
  import api from '../services/api';
  import { Dialog, Notify } from 'quasar';
  
  export default defineComponent({
    data() {
      return {
        user: null,
        loading: true,
        editing: false,
        editingField: null,
        newValue: null,
        changingPassword: false, // Pour le changement de mot de passe
        newPassword: null, // Nouveau mot de passe
        confirmPassword: null // Confirmation du nouveau mot de passe
      };
    },
    mounted() {
        const userId = Cookies.get('userID');
      api.get(`/User/${userId}`)
        .then(response => {
          this.user = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Erreur lors du chargement de l\'utilisateur:', error);
        });
    },
    methods: {
      enableEdit(field) {
        this.editing = true;
        this.editingField = field;
        this.newValue = this.user[field];
      },
      cancelEdit() {
        this.editing = false;
        this.editingField = null;
        this.newValue = null;
      },
      updateField() {
        Dialog.create({
          title: 'Confirmation',
          message: 'Voulez-vous vraiment mettre à jour cette information ?',
          cancel: true,
          persistent: true
        }).onOk(() => {

        const userId = this.user._id;
        api.patch(`/User/unique_update/${userId}`, { [this.editingField]: this.newValue })
          .then(response => {
            this.user = response.data;
            this.cancelEdit();
            Notify.create({
                color: 'green',
                message: 'Mise à jour réussie',
                icon: 'done'
              });
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour:', error);
          });
        });
      },
      enablePasswordChange() {
        this.changingPassword = true;
      },
      cancelPasswordChange() {
        this.changingPassword = false;
        this.newPassword = null;
        this.confirmPassword = null;
      },
      updatePassword() {
        if (this.newPassword !== this.confirmPassword) {
          Notify.create({
            color: 'red',
            message: 'Les mots de passe ne correspondent pas.',
            icon: 'error'
          });
          return;
        }
        if (this.newPassword.length < 5) {
          Notify.create({
            color: 'red',
            message: 'Le mot de passe doit contenir au moins 5 caractères.',
            icon: 'error'
          });
          return;
        }
        Dialog.create({
          title: 'Confirmation',
          message: 'Voulez-vous vraiment changer le mot de passe?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          const userId = this.user._id;
          api.patch(`/User/unique_update/${userId}`, { Mdp: this.newPassword }) // Assurez-vous que le mot de passe est haché côté serveur
            .then(() => {
              this.cancelPasswordChange();
              Notify.create({
                color: 'green',
                message: 'Mot de passe mis à jour avec succès.',
                icon: 'done'
              });
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour du mot de passe:', error);
            });
        }); // Fermez ici
      }
    }
  });
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.my-card {
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
}

.label-style {
  font-weight: bold;
  text-transform: uppercase;
}
</style>



