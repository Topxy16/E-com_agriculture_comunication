<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="">

                <v-col cols="6">
                    <h2 class="mb-3">เพิ่มข้อมูลที่อยู่</h2>
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

                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="4" class="ml-5">
                    <h2 class="mb-3">ที่อยู่</h2>
                    <div class="text-center">
                        <v-card class="mx-auto" max-width="600" height="128" v-for="item in address "
                            :key="item.user_id">

                            <div class="text-overline mb-1 text-left">
                                <h3 class="ml-2">Address</h3>
                            </div>
                            <div class="text-caption">
                                <h3> รายละเอียดที่อยู่ : {{ item.address }} </h3>
                                <h3> จังหวัด : {{ item.province }} อำเภอ : {{ item.district }}
                                    ตำบล : {{ item.sub_district }} รหัสไปรษณีย์ : {{ item.zip_code }} </h3>
                                <h3> เบอร์โทร : {{ item.tel }} </h3>
                            </div>

                        </v-card>
                    </div>
                </v-col>


            </v-row>
            <v-row>
                <v-col cols="7" class="">
                    <h2 class="mb-3">ส่งหลักฐานการชำระเงิน</h2>
                    <v-card class="" max-width="884" height="">
                        <v-card-item>
                            <v-form ref="form">
                               
                                <v-text-field v-model="IDAddress.user_a_id" label="IDUserAddress" disabled="true" required></v-text-field>
                                <v-file-input label="File input"></v-file-input>
                                <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                                <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
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

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetPaymentDetail()
        await this.GetProductDetail()
        await this.GetAddressbyID()
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
        async GetAddressbyID(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/useraddinfor/${user_id}`)
                this.address = resp.data.data
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
    }
}
</script>