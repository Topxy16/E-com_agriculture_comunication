<template>
  <v-data-table :headers="headers" :items="items" v-model="selected">
    <template v-slot:item.name="{ item }">
      {{ item.name }}
    </template>
  </v-data-table>
  <p>Number of Records: {{ recordsCount }}</p>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
      ],
      items: [
        { name: 'Foo' },
        { name: 'Bar' },
      ],
      selected: [],
    }
  },
  computed: {
    recordsCount() {
      return this.items.length;
    },
  },
}
</script>
