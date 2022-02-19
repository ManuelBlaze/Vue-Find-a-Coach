import { createRouter, createWebHistory } from 'vue-router';

import store from './store';

import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';

// import async components
const CoachesDetails = () => import('./pages/coaches/CoachesDetails.vue');

const CoachesRegistration = () =>
  import('./pages/coaches/CoachesRegistration.vue');

const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachesRegistration,
      meta: { requieresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requieresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requieresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _from, next) {
  if (to.meta.requieresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requieresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
