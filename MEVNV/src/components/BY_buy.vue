<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5">
                <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">แก้ไขข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.name" label="ชื่อสินค้า" disabled="true"></v-text-field>
                        <v-text-field v-model="order.idproduct" :value="product._id"></v-text-field>
                        <v-text-field v-model="order.qty" label="จำนวน" required></v-text-field>
                        <v-text-field v-model="order.sumprice" label="ราคา" required></v-text-field>
                        <v-text-field v-model="order.address" label="ที่อยู่ที่ต้องการจัดส่ง" required></v-text-field>
                        <!-- <v-file-input v-model="img" label="หลักฐานการชำระเงิน" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                            สั่งซื้อ
                        </v-btn>

                    </v-form>

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
            product: {
                name: ''

            },
            order: {
                idproduct: '',
                qty: '',
                sumprice: '',
                address: '',

            },

        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-buy';

            axios.post(apiURL, this.order).then(() => {
                // this.$router.push('/SL_viewproduct');
                this.order = {
                    idproduct: '',
                    qty: '',
                    sumprice: '',
                    address: '',

                }

            }).catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.product = res.data
        })
    },
}
</script>