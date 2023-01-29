<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">เพิ่มข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.product_name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="product_detail.pd_description" label="รายละเอียด"
                            required></v-text-field>
                        <v-text-field v-model="product_type.product_type_name" label="ประเภท" required></v-text-field>
                        <v-text-field v-model="product.product_price" label="ราคา" required></v-text-field>
                        <v-text-field v-model="product.product_number" label="จำนวน" required></v-text-field>
                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                            Create
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
                product_name: "",
                product_price: "",
                product_number: "",
            },
            product_detail: {
                pd_description: "",

            },
            product_type: {
                product_type_name: "",

            },
        }
    },
    created() {
        setAuthheader(localStorage.getItem("token"))
    },
    methods: {
        async handleSubmitForm() {
            await axios.post('http://localhost:3001/api/product', {
                product_name: this.product.product_name,
                product_price: this.product.product_price,
                product_number: this.product.product_number,
                product_type_name: this.product_type.product_type_name,
                pd_description: this.product_detail.pd_description,
            }).then((res) => {
                console.log(res.data.message)
                this.showAlert = true;
                this.$router.push('/SL_viewproduct');

            }).catch(error => {
                console.log(error)
                this.showAlert = true;
                this.alertMessage = error.response.data.message;
            })
        }
    }
}
</script>