const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignUpPage.vue') },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      // ... autres routes
    ]
  },
  // Toujours laisser cette ligne en dernier
  { path: '/:catchAll(.*)', component: () => import('pages/ErrorNotFound.vue') }
];

export default routes;
