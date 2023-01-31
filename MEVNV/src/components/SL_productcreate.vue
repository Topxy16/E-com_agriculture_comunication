<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">เพิ่มข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.product_name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="product.pd_description" label="รายละเอียด" required></v-text-field>
                        <v-text-field v-model="typeshow.product_type_name" label="ประเภท" required></v-text-field>

                        <v-select label="Select" v-model="product.py_id" 
                        :items="[typeshow]">
                        </v-select>

                        <v-text-field v-model="product.product_price" label="ราคา" required></v-text-field>
                        <v-text-field v-model="product.product_number" label="จำนวน" required></v-text-field>
                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                            เพิ่ม
                        </v-btn>

                    </v-form>

                </v-col>
            </v-row>
        </v-container>
    </v-img>
</template>

<style>

</style>

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            product: {
                py_id: '',
                product_name: '',
                product_price: '',
                product_number: ''
            },
            typeshow: [],
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.getProductType()

    },
    methods: {
        async handleSubmitForm() {
            try {
                const resp = await axios.post('http://localhost:3001/api/product', {
                    py_id: this.product.py_id,
                    product_name: this.product.product_name,
                    product_price: this.product.product_price,
                    product_number: this.product.product_number,
                })
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
        async getProductType() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product-type')
                this.typeshow = resp.data.data[0]

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