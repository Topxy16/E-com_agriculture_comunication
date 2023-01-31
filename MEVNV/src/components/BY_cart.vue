<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="justify-center">

                <v-col cols="8">
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
                                                เครื่องมือ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="cart in cart" :key="cart.user_id">
                                            <td>รูปสินค้า</td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">{{
                                                    item.product_id
                                                        === cart.product_id ? item.product_name : ""
                                                }}</div>
                                            </td>
                                            <td>
                                                <div style="width:125px;"><v-text-field class="mt-5" variant="solo"
                                                        type="number" v-model="cart.product_number"></v-text-field>
                                                </div>
                                            </td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">{{
                                                    item.product_id
                                                        === cart.product_id ? item.product_price : ""
                                                }}</div>
                                            </td>
                                            <td>
                                                <div v-for="item in product" :key="item.product_id">
                                                    {{
                                                        item.product_id === cart.product_id ? item.product_price *
                                                            cart.product_number : ''
                                                    }}
                                                </div>
                                            </td>

                                            <td>

                                                <v-btn @click="AddProductToOrder(cart.product_id, cart.product_number, cart.cart_shop_id)"
                                                    color="success" class="mr-2">
                                                    สั่งซื้อ
                                                </v-btn>

                                                <v-btn @click="deleteOrderInCart(cart.cart_shop_id)" color="red">
                                                    ลบ
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
            cart: [],
            product: [],
            totalprice: '',
        }
    },
    computed: {
        totalPrice() {

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetOrderDetail()
        await this.GetProductDetail()



    },
    methods: {
        async deleteOrderInCart(cart_shop_id) {
            console.log(cart_shop_id)
            try {
                const resp = await axios.delete(`http://localhost:3001/api/cart/${cart_shop_id}`, {
                    cart_shop_id: this.cart.cart_shop_id
                })
                this.cart_shop_id = resp.data.data
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
        async AddProductToOrder(product_id, product_number, cart_shop_id) {
            try {
                const resp = await axios.post(`http://localhost:3001/api/create-Order-to-Order/${product_id},${product_number},${cart_shop_id}`, {
                    product_id: this.cart.product_id,
                    product_number: this.cart.product_number,
                    cart_shop_id: this.cart.cart_shop_id,
                })

                this.cart = resp.data.data
                this.$router.go();
            } catch (e) {
                // if (e.response.status === 403) {
                //     alert("Token Exception")
                //     this.$router.push('/login');
                // } else if (e.response.status === 401) {
                //     alert("Go to Login")
                //     this.$router.push('/login');
                // }
                // console.log(e)
            }
        },
        async GetOrderDetail() {
            try {
                const resp = await axios.get('http://localhost:3001/api/GetOder-forCart')
                this.cart = resp.data.data

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