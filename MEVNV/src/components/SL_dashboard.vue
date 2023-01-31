<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6 justify-center" no-gutters>
                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="150" max-width="400" v-bind="props" title="จัดการร้านค้า">
                            <v-card-text class="text-center">

                                <router-link :to="`/SL_productcreate`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-edit" variant="outlined" class="mr-2">
                                        เพิ่มสินค้า
                                    </v-btn>
                                </router-link>
                                <router-link :to="`/SL_viewproduct`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-text" variant="outlined" class="">
                                        ดูหน้าร้านค้า
                                    </v-btn>
                                </router-link>
                                <router-link :to="`/SL_viewproduct`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-text" variant="outlined" class="">
                                        ดูหน้าร้านค้า
                                    </v-btn>
                                </router-link>
                            </v-card-text>

                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="150" max-width="400" v-bind="props" title="จำนวนออเดอร์">
                            <v-card-text class="mt-6 text-center">
                                <h1>{{ recordsCount }}</h1>
                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="150" max-width="400" v-bind="props" title="ยังไม่ชำระเงิน">
                            <v-card-text class="mt-12 text-center">

                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto "
                            height="150" max-width="400" v-bind="props" title="ยังไม่จัดส่ง">
                            <v-card-text class="mt-12 text-center">

                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>
            </v-row>

            <v-row no-gutters>
                

                <v-col cols="12">
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                             v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                เลขออเดอร์
                                            </th>
                                            <th class="text-left">
                                                รูปสินค้า
                                            </th>
                                            <th class="text-left">
                                                ชื่อ
                                            </th>
                                            <th class="text-left">
                                                จำนวน
                                            </th>
                                            <th class="text-left">
                                                ราคาต่อชิ้น
                                            </th>
                                            <th class="text-left">
                                                ราคารวม
                                            </th>
                                            <th class="text-left">
                                                สถานะการชำระเงิน
                                            </th>
                                            <th class="text-left">
                                                สถานะการการจัดส่ง
                                            </th>
                                            <th class="text-left">
                                                เครื่องมือ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in order" :key="order.user_id">
                                            <td>{{ order.orde_id }}</td>
                                            <td>รูปสินค้า</td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">
                                                    {{ item.product_id === order.product_id ? item.product_name : '' }}
                                                </div>
                                            </td>
                                            <td>{{ order.product_number }}</td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">
                                                    {{ item.product_id === order.product_id ? item.product_price : '' }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">
                                                    {{
                                                        item.product_id === order.product_id ?
                                                            item.product_price * order.product_number : ''
                                                    }}
                                                </div>
                                            </td>
                                            <td>{{ order.payment_status }}</td>
                                            <td>{{ order.is_delivery }}</td>
                                            <td>
                                                <router-link :to="`/SL_isdelivery/${order.orde_id}`" class="text-decoration-none text-black mr-2">
                                                <v-btn
                                                    color="success">
                                                    จัดส่งสินค้า
                                                </v-btn>
                                            </router-link>

                                                <v-btn @click="deleteOrderInOrder(order.orde_id)" color="red">
                                                    ยกเลิกคำสั่งซื้อ
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-hover>


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
            order: [],
            product: [],
        }
        
    },
    computed:{
        recordsCount() {
            return this.order.length;
        },
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetOrderDetail()
        await this.GetProductDetail()


    },
    methods: {
        async deleteOrderInOrder(orde_id) {
            console.log(orde_id)
            try {
                const resp = await axios.delete(`http://localhost:3001/api/order/${orde_id}`, {
                    orde_id: this.order.orde_id
                })
                this.order = resp.data.data
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
        async AddProductToOrder(product_id, product_name) {
            try {
                const resp = await axios.post(`http://localhost:3001/api/create-order-to-cart/${product_id},${product_name}`, {
                    product_id: this.product.product_id,
                    product_number: this.product.product_number
                })
                this.order = resp.data.data[0]

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
        async GetOrderDetail() {
            try {
                const resp = await axios.get('http://localhost:3001/api/GetCart-forOder')
                this.order = resp.data.data

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
        async GetProductDetail() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product')
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
        }
    }
}
</script>