<template>
  <v-app-bar :elevation="5" color="black">
    <v-app-bar-title>E-commerce ประชาสัมพันธ์และส่งเสริมการเกษตร</v-app-bar-title>
    <template v-slot:append>
      <router-link :to="`/SL_dashboard`" class="text-decoration-none text-white">
      <v-btn icon="mdi-home"></v-btn>
    </router-link>
      <router-link to="/login" class="text-decoration-none text-white" v-if="token === null">
      <v-btn icon="mdi-exit-to-app"></v-btn>
    </router-link>
      <router-link to="/logout" class="text-decoration-none text-white" v-else>
      <v-btn icon="mdi-exit-to-app">Logout</v-btn>
    </router-link>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      token: ''
    }
  },
  created() {
    this.token = localStorage.getItem('token');
  },
  mounted() {
    this.token = localStorage.getItem('token');
  },
  updated()  {
    this.token = localStorage.getItem('token');
  } 
}

  //
</script>
