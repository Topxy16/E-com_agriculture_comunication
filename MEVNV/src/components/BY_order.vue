<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
                

                
            </v-row>

            <v-row no-gutters>
                <v-col cols="3">

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="550" max-width="400" v-bind="props" title="โปรไฟล์ผู้ซื้อ">
                            <v-card-text class="mt-12 text-center">

                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col cols="9">
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            max-width="1280" v-bind="props">
                            <v-card-text>
                                <h2>รายละเอียดคำสั่งซื้อ</h2>
                                <v-table title="ตาราง Order">
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
                                                ราคารวม
                                            </th>
                                            <th class="text-left">
                                                ที่อยู่จัดส่ง
                                            </th>
                                            <th class="text-left">
                                                สถานะการชำระเงิน
                                            </th>
                                            <th class="text-left">
                                                สถานะการจัดส่ง
                                            </th>
                                            <th class="text-left">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in Order" :key="order._id">
                                            <td>รูปสินค้า</td>
                                            <td>ชื่อสินค้า</td>
                                            <td>{{ order.qty }}</td>
                                            <td>{{ order.sumprice }}</td>
                                            <td>{{ order.address }}</td>
                                            <td>หลักฐานการชำระเงิน</td>
                                            <td>สถานะการจัดส่ง</td>
                                            <td>

                                                <!-- <router-link :to="`/SL_update/${product._id}`" class="text-decoration-none">
                                    <v-btn color="success" class="mr-2">แก้ไข</v-btn> 
                                        </router-link> -->
                                                <v-btn @click.prevent="deleteProduct(order._id)" color="success"
                                                    class="mr-2 ">
                                                    ส่งหลักฐานการชำระ
                                                </v-btn>
                                                <v-btn @click.prevent="deleteProduct(order._id)" color="red">
                                                    ลบออเดอร์
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

export default {
    data() {
        return {
            Order: []

        }
    },
    computed: {
        recordsCount() {
            return this.Order.length;
        },
    },
    created() {
        let apiURL = 'http://localhost:4000/api/get-order';
        axios.get(apiURL).then(res => {
            this.Order = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteProduct(id) {
            let apiURL = `http://localhost:4000/api/delete-buy/${id}`;
            let indexOfArrayItem = this.Order.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Order.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>