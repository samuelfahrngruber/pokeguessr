import { createRouter, createWebHistory } from 'vue-router';
import PlayView from '../views/PlayView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlayView,
    },
  ],
});

export default router;
