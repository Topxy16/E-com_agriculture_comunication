import { createWebHistory, createRouter } from "vue-router";
import SL_viewproduct from "@/components/SL_viewproduct-page.vue";
import SL_update from "@/components/SL_productupdate.vue";
import SL_dashboard from "@/components/SL_dashboard.vue";
import SL_create from "@/components/SL_productcreate.vue";
import regis from "@/components/regis.vue";
import login from "@/components/login.vue";
import SL_store from "@/components/SL_store.vue";
import ai from "@/components/testai.vue";
import SL_storeupdate from "@/components/SL_storeupdate.vue";
import BY_Home from "@/components/BY_Home.vue";
import BY_buy from "@/components/BY_buy.vue";
import BY_cart from "@/components/BY_cart.vue";
import Admin_dashboard from "@/components/Admin_dashboard.vue";
import Admin_userupdate from "@/components/Admin_userupdate.vue";
import SL_storecreate from "@/components/SL_storecreate.vue";
import by_order from "@/components/by_order.vue";
import SL_Ptypecreate from "@/components/SL_Ptypecreate.vue";

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
        path: '/SL_productupdate/:id',
        name: 'SL_update',
        component: SL_update
      },
      {
        path: '/SL_dashboard',
        name: 'SL_dashboard',
        component: SL_dashboard
      },
      {
        path: '/SL_productcreate',
        name: 'SL_create',
        component: SL_create
      },
      {
        path: '/regis',
        name: 'regis',
        component: regis
      },
      {
        path: '/login',
        name: 'login',
        component: login
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
        path: '/BY_cart',
        name: 'BY_cart',
        component: BY_cart
      },
      {
        path: '/Admin_dashboard',
        name: 'Admin_dashboard',
        component: Admin_dashboard
      },
      {
        path: '/Admin_userupdate/:id',
        name: 'Admin_userupdate',
        component: Admin_userupdate
      },
      {
        path: '/SL_storecreate',
        name: 'SL_storecreate',
        component: SL_storecreate
      },
      {
        path: '/by_order',
        name: 'by_order',
        component: by_order
      },
      {
        path: '/SL_Ptypecreate',
        name: 'SL_Ptypecreate',
        component: SL_Ptypecreate
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;