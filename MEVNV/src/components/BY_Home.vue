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
                               
                                    <router-link :to="`/BY_buy/${product._id}`" class="text-decoration-none">
                                    <v-btn color="success" class="mr-2">สั่งซื้อ</v-btn> 
                                        </router-link>
                            
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
            Product: [],
            apiURL: 'http://localhost:4000/api',
        }
    },
    created() {
        // let apiURL = 'http://localhost:4000/api';
        // axios.get(apiURL).then(res => {
        //     this.Product = res.data
        // }).catch(error => {
        //     if (error.response.status === 403) {
        //         alert('go to Login')
        //     }
        //     console.log(error.response)
        // })
        this.getProduct()
    },
    methods: {
        async getProduct() {
            try {
                const resp = await axios.get(this.apiURL, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                this.Product = resp.data
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