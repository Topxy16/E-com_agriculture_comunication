<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="300">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
    </template>

    <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

    <v-card-item>
      <v-card-title>product.product_name</v-card-title>

      <v-card-subtitle>
        <span class="me-1">store.store_id</span>

        <v-icon color="error" icon="mdi-store" size="small"></v-icon>

      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :model-value="3.5" color="amber" density="compact" half-increments readonly size="small"></v-rating>

      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • product.product_price
      </div>

      <div>product.product_detail</div>
    </v-card-text>


    <v-card-actions class="justify-end">
      <v-btn color="info" variant="text" @click="reserve">
        เพิ่มลงตะกร้าสินค้า
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>