<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5">
                <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">View Product</h1>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Details
                                </th>
                                <th class="text-left">
                                    Price
                                </th>
                                <th class="text-left">
                                    qty
                                </th>
                                <th class="text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in Product" :key="product._id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.detail }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.qty }}</td>
                                <td>
                                    
                                    <router-link :to="`{ name: 'editproduct', params: { id: product.id }}`">
                                    <v-btn color="success" class="mr-2">Edit</v-btn> 
                                        </router-link>
                                    <v-btn @click.prevent="deleteProduct(product._id)" color="red">
                                        Delete
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </v-container>
    </v-img>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            Product: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api';
        axios.get(apiURL).then(res => {
            this.Product = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteProduct(id) {
            let apiURL = `http://localhost:4000/api/delete-product/${id}`;
            let indexOfArrayItem = this.Product.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Product.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>