import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/productos', component: () => import('pages/ProductsPage.vue') },
      { path: '/celulares', component: () => import('pages/PhonesPage.vue') },
      { path: '/micas', component: () => import('pages/MicasPage.vue') },
      { path: '/covers', component: () => import('pages/CoversPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
