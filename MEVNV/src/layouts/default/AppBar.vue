<template>
  <v-app-bar :elevation="5" color="black">
    <v-app-bar-title>E-commerce ประชาสัมพันธ์และส่งเสริมการเกษตร</v-app-bar-title>
    <template v-slot:append>
      <router-link :to="`/SL_dashboard`" class="text-decoration-none text-white">
      <v-btn icon="mdi-home"></v-btn>
    </router-link>

      <v-btn icon="mdi-exit-to-app"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
  //
</script>
