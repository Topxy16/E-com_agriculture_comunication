<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="justify-center">

                <v-col cols="12">
                    <h2 class="mb-3">คำสั่งซื้อ</h2>
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            max-width="" v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                OrderID
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
                                                สถานะการจัดส่ง
                                            </th>
                                            <th class="text-left">
                                                แอคชั่น
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in order" :key="order.user_id">
                                            <td>{{ order.orde_id }}</td>
                                            <td><v-img  height="150" width="100" :src="(`/src/assets/${order.image}`)"></v-img></td>
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
                                            <td>{{ order.payment_status === "0" ? 'ยังไม่ทำการชำระเงิน' : 'ชำระแล้ว' }}</td>
                                            <td>{{ order.is_delivery === 0 ? 'ยังไม่ทำการจัดส่ง' : 'จัดส่งแล้ว'}}</td>
                                            <td v-if="order.payment_status === '0'">
                                                <router-link :to="`/BY_Payment/${order.orde_id}`"
                                                    class="text-decoration-none text-black">
                                                    <v-btn color="success" class="mr-2">
                                                        ชำระเงิน
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
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetOrderDetail()
        await this.GetProductDetail()
        document.title = 'Order'


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