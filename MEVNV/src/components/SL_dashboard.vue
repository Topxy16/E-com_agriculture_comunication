<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="150" max-width="400" v-bind="props" title="จัดการร้านค้า">
                            <v-card-text class="text-center">

                                <router-link :to="`/SL_create`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-edit" variant="outlined" class="mr-2">
                                        เพิ่มสินค้า
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
                <v-col cols="3">

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            class="mx-auto mr-5" height="550" max-width="400" v-bind="props" title="โปรไฟล์ร้านค้า">
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="order in order" :key="order._id">
                                            <td>รูปสินค้า</td>
                                            <div v-for="item in product" :key="item._id"><td>{{ item._id === order.idproduct ? item.name : '' }}</td></div>
                                            <td>{{ order.qty }}</td>
                                            <td>{{ order.sumprice }}</td>
                                            <td>{{ order.address }}</td>
                                           <td>สถานะการชำระเงิน</td>
                                            <td>

                                                <!-- <router-link :to="`/SL_update/${product._id}`" class="text-decoration-none">
                                    <v-btn color="success" class="mr-2">แก้ไข</v-btn> 
                                        </router-link> -->
                                                <v-btn @click.prevent="deleteProduct(order._id)" color="success"
                                                    class="mr-2">
                                                    จัดส่งแล้ว
                                                </v-btn>
                                                <v-btn @click.prevent="deleteProduct(order._id)" color="red">
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

export default {
    data() {
        return {
            order: [],
            product: [],


        }
    },
    computed: {
        recordsCount() {
            return this.order.length;
        },
    },
    async created() {
        await this.orderview()
        await this.productview()
    },
    methods: {
        deleteProduct(id) {
            let apiURL = `http://localhost:4000/api/delete-buy/${id}`;
            let indexOfArrayItem = this.order.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.order.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        productview() {
            let apiURL = 'http://localhost:4000/api';
            axios.get(apiURL).then(res => {
                this.product = res.data
                console.log(this.product)
            }).catch(error => {
                console.log(error)
                
                
            })
        },
        orderview() {
            let apiURL = 'http://localhost:4000/api/get-order';
            axios.get(apiURL).then(res => {
                this.order = res.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>