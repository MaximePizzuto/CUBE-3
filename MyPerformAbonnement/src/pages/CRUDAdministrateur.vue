<template>
    <div class="q-pa-md container">
      <h4>Gestion des utilisateurs</h4>
  
      <q-card class="my-card">
        <q-card-section>
          <q-spinner-hourglass v-if="loading" size="40px" />
          <div v-else class="q-gutter-md">
            <q-btn color="primary" label="Ajouter un utilisateur" @click="enableAddUser" />
            <div class="q-pb-md" v-for="user in users" :key="user._id">
              <div class="row justify-between">
                <div>
                  <label class="label-style">{{ user.Nom }} : </label>{{ user.Mail }}
                </div>
                <div class="q-ml-auto">
                  <q-btn color="primary" label="Modifier" @click="enableEdit(user)" />
                  <q-btn color="negative" label="Supprimer" @click="deleteUser(user._id)" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
  
      <!-- Dialog pour modifier un utilisateur -->
        <q-dialog v-model="editing">
        <q-card>
            <q-card-section style="max-height: 400px; overflow-y: auto;">
            <h5>Modification de l'utilisateur {{ userToEdit.Nom }}</h5>
            <q-input filled v-model="userToEdit.Nom" label="Nom"></q-input>
            <q-input filled v-model="userToEdit.Mail" label="Email"></q-input>
            <q-input filled v-model="userToEdit.Prenom" label="Prénom"></q-input>
            <q-input filled v-model="userToEdit.Tel" label="Téléphone"></q-input>
            <q-input filled v-model="userToEdit.Entreprise" label="Entreprise"></q-input>
            <q-input filled v-model="userToEdit.Mdp" label="Mot de passe" type="password"></q-input>
            </q-card-section>
            <q-card-actions>
            <q-btn label="Confirmer" @click="editUser()"></q-btn>
            <q-btn label="Annuler" @click="editing = false"></q-btn>
            </q-card-actions>
        </q-card>
        </q-dialog>

        <!-- Dialog pour ajouter un utilisateur-->
        <q-dialog v-model="adding">
        <q-card>
            <q-card-section style="max-height: 400px; overflow-y: auto;">
            <h5>Ajout d'un nouvel utilisateur</h5>
            <q-input filled v-model="newUser.Nom" label="Nom"></q-input>
            <q-input filled v-model="newUser.Mail" label="Email"></q-input>
            <q-input filled v-model="newUser.Prenom" label="Prénom"></q-input>
            <q-input filled v-model="newUser.Tel" label="Téléphone"></q-input>
            <q-input filled v-model="newUser.Entreprise" label="Entreprise"></q-input>  
            <q-input filled v-model="newUser.Mdp" label="Mot de passe" type="password"></q-input>
            </q-card-section>
            <q-card-actions>
            <q-btn label="Ajouter" @click="addUser()"></q-btn>
            <q-btn label="Annuler" @click="adding = false"></q-btn>
            </q-card-actions>
  </q-card>
</q-dialog>

    </div>
  </template>
  
  <script>
    import { defineComponent, ref, onMounted } from 'vue';
    import api from '../services/api';  // Adaptez ce chemin à votre propre service API
    import { Dialog, Notify } from 'quasar';
  
    export default defineComponent({
      setup() {
        const users = ref([]);
        const loading = ref(true);
        const editing = ref(false);
        const adding = ref(false);
        const userToEdit = ref(null);
        const newUser = ref({ Nom: '', Mail: '' });
  
        const loadUsers = () => {
          api.get('/Users')
            .then(response => {
              users.value = response.data;
              loading.value = false;
            })
            .catch((err) => {
                res.status(400).json({ error: err.message, message: 'Aucun utilisateurs dans la collection !' });
            });
        };

        onMounted(() => {
            loadUsers();
        });
  
        const enableEdit = (user) => {
          editing.value = true;
          userToEdit.value = { ...user };
        };
  
        const cancelEdit = () => {
          editing.value = false;
          userToEdit.value = null;
        };
  
        const editUser = () => {
          api.patch(`/User/unique_update/${userToEdit.value._id}`, userToEdit.value)
            .then(() => {
              loadUsers();
              Notify.create({
                color: 'green',
                message: 'Utilisateur mis à jour avec succès',
                icon: 'done'
              });
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            });
          editing.value = false;
          userToEdit.value = null;
        };
  
        const enableAddUser = () => {
          adding.value = true;
        };
  
        const cancelAdd = () => {
          adding.value = false;
          newUser.value = { Nom: '',
      Prenom: '',
      Mail: '',
      Tel: '',
      Entreprise: '',
      Mdp: '', };
        };
  
        const addUser = () => {
          api.post('/User/signup', newUser.value)
            .then(() => {
              loadUsers();
              Notify.create({
                color: 'green',
                message: 'Utilisateur ajouté avec succès',
                icon: 'done'
              });
            })
            .catch(error => {
              console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            });
          adding.value = false;
          newUser.value = { Nom: '',
      Prenom: '',
      Mail: '',
      Tel: '',
      Entreprise: '',
      Mdp: '', };
        };
  
        const deleteUser = (userId) => {
          Dialog.create({
            title: 'Confirmation',
            message: 'Voulez-vous vraiment supprimer cet utilisateur?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            api.delete(`/User/delete/${userId}`)
              .then(() => {
                loadUsers();
                Notify.create({
                  color: 'green',
                  message: 'Utilisateur supprimé avec succès',
                  icon: 'done'
                });
              })
              .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
              });
          });
        };
  
        return {
          users,
          loading,
          editing,
          adding,
          userToEdit,
          newUser,
          loadUsers,
          enableEdit,
          cancelEdit,
          editUser,
          enableAddUser,
          cancelAdd,
          addUser,
          deleteUser
        };
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
  
  