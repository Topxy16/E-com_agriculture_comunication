<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="justify-center">

                <v-col cols="6">
                    <h2 class="mb-3">ข้อมูลออร์เดอร์</h2>
                    <v-card class="" max-width="" height="">
                        <v-card-item>
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
                                            ที่อยู่ที่ต้องจัดส่ง
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="payment in payment" :key="payment.orde_id">
                                        <td>{{ payment.orde_id }}</td>
                                        <td>รูปสินค้า</td>
                                        <td>
                                            <div v-for="item in product" :key="item.product_id">
                                                {{ item.product_id === payment.product_id ? item.product_name : '' }}
                                            </div>
                                        </td>
                                        <td>{{ payment.product_number }}</td>
                                        <td>
                                            <div v-for="item in product" :key="item.product_id">
                                                {{ item.product_id === payment.product_id ? item.product_price : '' }}
                                            </div>
                                        </td>
                                        <td>
                                            <div v-for="item in product" :key="item.product_id">
                                                {{
                                                    item.product_id === payment.product_id ?
                                                        item.product_price * payment.product_number : ''
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <div v-for="item in address" :key="item.user_a_id">
                                                {{ item.user_a_id === payment.user_a_id ? item.address : '' }}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="6" class="">
                    <h2 class="mb-3">ส่งหลักฐานการจัดส่ง</h2>
                    <v-card class="" max-width="884" height="">
                        <v-card-item>
                            <v-form ref="form">
                               
                                <v-text-field v-model="IDAddress.user_a_id" label="IDUserAddress" disabled="true" required></v-text-field>
                                <v-text-field v-model="Delivery.is_delivery" label="เลขพัสดุ"  required></v-text-field>
                               
                                <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                                <v-btn color="success" class="mr-4 w-100" @click="UpdateDeliveryStatus">
                                    ยืนยัน
                                </v-btn>


                            </v-form>
                        </v-card-item>
                    </v-card>
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
            payment: [],
            product: [],
            address: [],
            IDAddress: {
                user_a_id: '',
            },
            Delivery:{
                is_delivery:'',
            }

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetPaymentDetail()
        await this.GetProductDetail()
        await this.GetAddressbyOrder()
        await this.GetUser_a_idbyID()


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
        async GetPaymentDetail() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/GetOder-forPayment/${this.$route.params.id}`)
                this.payment = resp.data.data

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
        },
        async GetAddressbyOrder() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/Order/Address`)
                this.address = resp.data.data
                console.log(this.address)
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
        async GetUser_a_idbyID(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/useraddinfor/${user_id}`)
                this.IDAddress = resp.data.data[0]
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
        async UpdateDeliveryStatus() {
            try {
                    await axios.patch(`http://localhost:3001/api/delivery/${this.$route.params.id}`, {
                    is_delivery: this.Delivery.is_delivery,

                })                
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