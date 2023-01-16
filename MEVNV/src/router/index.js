import { createWebHistory, createRouter } from "vue-router";
import SL_viewproduct from "@/components/SL_viewproduct-page.vue";
import SL_update from "@/components/SL_update.vue";
import SL_dashboard from "@/components/SL_dashboard.vue";
import SL_create from "@/components/SL_create.vue";
import SL_regis from "@/components/regis.vue";
import SL_login from "@/components/login.vue";
import SL_store from "@/components/SL_store.vue";
import ai from "@/components/testai.vue";
import SL_storeupdate from "@/components/SL_storeupdate.vue";
import BY_Home from "@/components/BY_Home.vue";
import BY_buy from "@/components/BY_buy.vue";
import BY_order from "@/components/BY_order.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
      },
      {
        path: '/SL_viewproduct',
        name: 'SL_viewproduct',
        component: SL_viewproduct
      },
      {
        path: '/SL_update/:id',
        name: 'SL_update',
        component: SL_update
      },
      {
        path: '/SL_dashboard',
        name: 'SL_dashboard',
        component: SL_dashboard
      },
      {
        path: '/SL_create',
        name: 'SL_create',
        component: SL_create
      },
      {
        path: '/regis',
        name: 'regis',
        component: SL_regis
      },
      {
        path: '/login',
        name: 'login',
        component: SL_login
      },
      {
        path: '/SL_store',
        name: 'SL_store',
        component: SL_store
      },
      {
        path: '/ai',
        name: 'ai',
        component: ai
      },
      {
        path: '/SL_storeupdate',
        name: 'SL_storeupdate',
        component: SL_storeupdate
      },
      {
        path: '/BY_Home',
        name: 'BY_Home',
        component: BY_Home
      },
      {
        path: '/BY_buy/:id',
        name: 'BY_buy',
        component: BY_buy
      },
      {
        path: '/BY_order',
        name: 'BY_order',
        component: BY_order
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;