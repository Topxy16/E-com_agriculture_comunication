<template>
  <v-app-bar :elevation="5" color="black">
    <v-app-bar-title>E-commerce ประชาสัมพันธ์และส่งเสริมการเกษตร</v-app-bar-title>
    <template v-slot:append>
      <router-link :to="`/SL_dashboard`" class="text-decoration-none text-white">
        <v-btn icon="mdi-home"></v-btn>
      </router-link>
      <router-link :to="`/Login`" class="text-decoration-none text-white">
        <v-btn icon="mdi-login-variant"></v-btn>
      </router-link>

        <v-btn @click.prevent="Logout()" icon="mdi-logout-variant"></v-btn>
 
    </template>
  </v-app-bar>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-multiple" title="User" :to="item.link1"></v-list-item>
      <v-list-item prepend-icon="mdi-account-edit" title="Role" :to="item.link2"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="User_Address" :to="item.link9"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="User_Profile" :to="item.link10"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard-edit" title="Product type" :to="item.link8"></v-list-item>
      <v-list-item prepend-icon="mdi-home" title="Home" :to="item.link3"></v-list-item>
      <v-list-item prepend-icon="mdi-cart" title="Your Cart" :to="item.link4"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard" title="Your Order" :to="item.link7"></v-list-item>
      <v-list-item prepend-icon="mdi-store" title="Store" :to="item.link5"></v-list-item>


      <v-list-item prepend-icon="mdi-store-edit" title="Store Create" :to="item.link6"></v-list-item>
    </v-list>
  </v-navigation-drawer>






</template>

<script>
export default {
  data() {
    return {
      token: '',
      item: {
        link1: '/Admin_dashboard',
        link2: '/Admin_role',
        link3: '/by_home',
        link4: '/by_cart',
        link5: '/SL_dashboard',
        link6: '/SL_storecreate',
        link7: '/by_order',
        link8: '/SL_Ptypecreate',
        link9: '/CreateUser_address',
        link10: '/UserProfile',
      }

    }
  },
  created() {
    this.token = localStorage.getItem('token');
  },
  mounted() {
    this.token = localStorage.getItem('token');
  },
  updated() {
    this.token = localStorage.getItem('token');
  },
  methods: {
    async Logout() {
      try {
        const resp = await axios.post('http://localhost:3001/auth/logout');
        resp.statusCode = 200;
      } catch (e) {
        // if (e.response.status === 403) {
        //     alert("Token Exception")
        //     this.$router.push('/login');
        // } else if (e.response.status === 401) {
        //     alert("Go to Login")
        //     this.$router.push('/login');
        // }
        console.log(e)
      }
    },
  }
}
</script>
