<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="12" class="mt-5">
                    <h1 class="mb-5">จัดการสินค้า</h1>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="">
                                    สินค้า
                                </th>
                                <th class="" width="200">
                                    
                                </th>
                                <th class="" width="400">
                                    รายละเอียด
                                </th>
                                <th class="">
                                    ราคา
                                </th>
                                <th class="">
                                    จำนวน
                                </th>
                                <th class="">
                                    ประเภท
                                </th>
                                <th class="">
                                    สถานะการจำหน่าย
                                </th>
                                <th class="">
                                    เครื่องมือ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in product" :key="product.product_id">
                                <td>{{ product.product_name }}</td>
                                <td><v-img :src="(`/src/assets/${product.image}`)" max-height="100"></v-img></td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.product_price }}</td>
                                <td>{{ product.product_number }}</td>                          
                                <td>
                                    <div v-for="item in ptype" :key="item.product_type_id">
                                    {{ item.product_type_id === product.py_id ? item.product_type_name:'' }}
                                </div>
                                </td>
                           
                                <td>{{ product.product_show === 1 ? 'พร้อมจำหน่าย' : 'ไม่พร้อมจำหน่าย' }}</td>
                                <td>

                                    <router-link :to="`/SL_productupdate/${product.product_id}`"
                                        class="text-decoration-none">
                                        <v-btn color="success" class="mr-2">แก้ไข</v-btn>
                                    </router-link>

                                    <v-btn @click.prevent="showProduct(product.product_id)" color="info">
                                        พร้อมจำหน่าย
                                    </v-btn>
                                    <v-btn @click.prevent="deleteProduct(product.product_id)" color="red" class="ml-2">
                                        ไม่พร้อมจำหน่าย
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <!-- <v-col cols="6">
                    <v-img :src="(`/src/assets/${store.QrCode}`)"></v-img>
                </v-col> -->
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
            ptype: [],
            store: [],


        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.viewProduct()
        await this.getProductType()
        await this.getStoreinfo()
        

    },
    methods: {
        async deleteProduct(product_id) {
            try {
                const resp = await axios.delete(`http://localhost:3001/api/product/show/${product_id}`)
                this.product = resp.data.data
                this.$router.go()
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
        async showProduct(product_id) {
            try {
                const resp = await axios.patch(`http://localhost:3001/api/product/show/${product_id}`)
                this.product = resp.data.data
                this.$router.go()
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
        async viewProduct() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-by-storeID`)
                this.product = resp.data.data
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
        async getProductType() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product-type')
                this.ptype = resp.data
                console.log(resp.data)
                resp.data.forEach(element => {
                    console.log(element.product_type_name)
                });

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
        async getStoreinfo(store_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/storeqr/${store_id}`,)
                this.store = resp.data.data[0]
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
        }

    }
}
</script>