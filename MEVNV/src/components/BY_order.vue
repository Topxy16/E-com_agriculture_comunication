<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="justify-center">

                <v-col cols="6">
                    <h2 class="mb-3">ตะกร้าสินค้าของคุณ</h2>
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            max-width="" v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in order" :key="order.user_id">
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
                                            <td><div v-for="item in product" :key="item.product_id">
                                                    {{ item.product_id === order.product_id ? item.product_price*order.product_number : '' }}
                                                </div></td>
                                            <td>
                                                <v-btn
                                                    @click="AddProductToOrder(product.product_id, product.product_number)"
                                                    color="success" class="mr-2">
                                                    ชำระเงิน
                                                </v-btn>

                                                <v-btn @click="deleteOrderInCart(cart.orde_id)" color="red">
                                                    ลบสินค้าออกจากตะกร้า
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
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetOrderDetail()
        await this.GetProductDetail()


    },
    methods: {
        async deleteOrderInCart(orde_id) {
            console.log(orde_id)
            try {
                const resp = await axios.delete(`http://localhost:3001/api/order/${orde_id}`, {
                    orde_id: this.order.orde_id
                })
                this.order = resp.data.data
                this.$router.push('/by_cart');


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