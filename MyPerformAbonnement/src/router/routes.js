import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignUpPage.vue') },
      { path: '/aboencours', component: () => import('pages/AboEnCours.vue') },
      { path: '/gerermonabo', component: () => import('pages/GererMonAbo.vue') },
      { path: '/monhistorique', component: () => import('pages/MonHistorique.vue') },
      { path: '/mafacture', component: () => import('pages/MaFacture.vue') },
      { path: '/utilisateur', component: () => import('pages/InformationUtilisateur.vue')},
      { path: '/administrateur', component: () => import('pages/CRUDAdministrateur.vue')},
      { path: '/home',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/HomePage.vue') }
      ],
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!Cookies.get('authToken'); // Vérifiez si l'utilisateur est authentifié
        if (isAuthenticated) {
          next(); // Si l'utilisateur est authentifié, continuez à la page d'accueil
        } else {
          next('/login'); // Sinon, redirigez l'utilisateur vers la page de connexion
        }
      } },
     
    ]
  },
  // Toujours laisser cette ligne en dernier
  { path: '/:catchAll(.*)', component: () => import('pages/ErrorNotFound.vue') }
];

export default routes;

