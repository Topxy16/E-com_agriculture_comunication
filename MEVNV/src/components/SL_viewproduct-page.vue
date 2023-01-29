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
                                    เครื่องมือ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in product" :key="product.product_id">
                                <td>{{ product.product_name }}</td>
                                <td></td>
                                <td>{{ product.product_price }}</td>
                                <td>{{ product.product_number }}</td>
                                <td>
                               
                                    <router-link :to="`/SL_productupdate/${product.product_id}`" class="text-decoration-none">
                                    <v-btn color="success" class="mr-2">แก้ไข</v-btn> 
                                        </router-link>
                            
                                    <v-btn @click.prevent="deleteProduct(product.product_id)" color="red">
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
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            product: [],

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        this.viewProduct()
    },
    methods: {
        async deleteProduct(id) {
            try {
                const resp = await axios.delete(`http://localhost:3001/api/product/${id}`)
                this.product = resp.data.data
            } catch (e) {
                if (e.response.status === 403) {
                    alert("Token Exception")
                    this.$router.push('/login');
                } else if (e.response.status === 401) {
                    alert("Go to Login")
                    this.$router.push('/login');
                }
                console.log(e)
            }
        },
        async viewProduct() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product')
                this.product = resp.data.data
            } catch (e) {
                if (e.response.status === 403) {
                    alert("Token Exception")
                    this.$router.push('/login');
                } else if (e.response.status === 401) {
                    alert("Go to Login")
                    this.$router.push('/login');
                }
                console.log(e)
            }
        }
    }
}
</script>