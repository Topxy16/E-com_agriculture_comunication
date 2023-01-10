import { createWebHistory, createRouter } from "vue-router";
// import CreateComponent from "@/components/CreateComponent.vue";
// import EditComponent from "@/components/EditComponent.vue";
// import ListComponent from "@/components/ListComponent.vue";
import product from "@/components/Createproduct-page.vue";
import viewproduct from "@/components/Listproduct-page.vue";
import editproduct from "@/components/Editproduct-page.vue";

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
        path: '/createproduct',
        name: 'createproduct',
        component: product
      },
      {
        path: '/viewproduct',
        name: 'viewproduct',
        component: viewproduct
      },
      {
        path: '/editproduct',
        name: 'editproduct',
        component: editproduct
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;