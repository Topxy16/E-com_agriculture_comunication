import { createWebHistory, createRouter } from "vue-router";
import SL_viewproduct from "@/components/SL_viewproduct-page.vue";
import SL_update from "@/components/SL_update.vue";
import SL_dashboard from "@/components/SL_dashboard.vue";
import SL_create from "@/components/SL_create.vue";

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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;