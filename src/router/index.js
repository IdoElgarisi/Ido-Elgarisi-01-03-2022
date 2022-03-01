import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "about" */ '../views/favorites.vue')
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
