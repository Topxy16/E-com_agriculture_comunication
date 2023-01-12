<template>
        <v-img src="@/assets/9.png" class="responsive">
            <v-container fluid>
                <v-row class="mt-5">
                    <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">กรอกข้อมูลสินค้าที่ต้องการเพิ่ม</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="product.detail" label="รายละเอียด" required></v-text-field>
                        <v-text-field v-model="product.price" label="ราคา" required></v-text-field>
                        <v-text-field v-model="product.qty" label="จำนวน" required></v-text-field>
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

export default {
    data() {
        return {
            product: {
                name: '',
                detall: '',
                price: '',
                qty: '',
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-product';

            axios.post(apiURL, this.product).then(() => {
                this.$router.push('/SL_viewproduct');
                this.product = {
                    name: '',
                    detall: '',
                    price: '',
                    qty: '',
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>