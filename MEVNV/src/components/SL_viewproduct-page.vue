<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5">
                <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">จัดการสินค้า</h1>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    ชื่อสินค้า
                                </th>
                                <th class="text-left">
                                    รายละเอียด
                                </th>
                                <th class="text-left">
                                    ราคา
                                </th>
                                <th class="text-left">
                                    จำนวน
                                </th>
                                <th class="text-left">
                                    จัดการ
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
                               
                                    <router-link :to="`/editproduct/${product._id}`" class="text-decoration-none">
                                    <v-btn color="success" class="mr-2">แก้ไข</v-btn> 
                                        </router-link>
                            
                                    <v-btn @click.prevent="deleteProduct(product._id)" color="red">
                                        ลบ
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