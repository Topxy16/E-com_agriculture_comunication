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
import BY_order from "@/components/BY_order.vue";
import SL_Ptypecreate from "@/components/SL_Ptypecreate.vue";
import CreateUser_address from "@/components/CreateUser_address.vue";
import UserProfile from "@/components/UserProfile.vue";
import UpdateUser_address from "@/components/UpdateUser_address.vue";
import UpdateUserInfo from "@/components/UpdateUserInfo.vue";
import BY_Payment from "@/components/BY_Payment.vue";
import SL_isdelivery from "@/components/SL_isdelivery.vue";
import SL_uploadfile from "@/components/SL_uploadfile.vue";
import SL_static from "@/components/SL_static.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
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
        path: '/SL_storeupdate/:id',
        name: 'SL_storeupdate',
        component: SL_storeupdate
      },
      {
        path: '/',
        name: 'Home',
        component: BY_Home,
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
        path: '/BY_order',
        name: 'BY_order',
        component: BY_order
      },
      {
        path: '/SL_Ptypecreate',
        name: 'SL_Ptypecreate',
        component: SL_Ptypecreate
      },
      {
        path: '/CreateUser_address',
        name: 'CreateUser_address',
        component: CreateUser_address
      },
      {
        path: '/UserProfile',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: '/UpdateUser_address/:id',
        name: 'UpdateUser_address',
        component: UpdateUser_address
      },
      {
        path: '/UpdateUserInfo/:id',
        name: 'UpdateUserInfo',
        component: UpdateUserInfo
      },
      {
        path: '/BY_Payment/:id',
        name: 'BY_Payment',
        component: BY_Payment
      },
      {
        path: '/SL_isdelivery/:id',
        name: 'SL_isdelivery',
        component: SL_isdelivery
      },
      {
        path: '/SL_uploadfile',
        name: 'SL_uploadfile',
        component: SL_uploadfile
      },
      {
        path: '/SL_static',
        name: 'SL_static',
        component: SL_static
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;