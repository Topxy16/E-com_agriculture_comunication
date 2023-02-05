<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">แก้ไขข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.product_name" label="ชื่อสินค้า" required></v-text-field>
                        <v-text-field v-model="product.description" label="รายละเอียด" required></v-text-field>                     
                        <v-text-field v-model="product.product_price" label="ราคาสินค้า" required></v-text-field>
                        <v-text-field v-model="product.product_number" label="จำนวน" required></v-text-field>
                        <v-autocomplete label="เลือกประเภท" v-model="product.py_id" :items="typeshow"
                            item-title="product_type_name" item-value="product_type_id" :return-object="false">
                        </v-autocomplete>
                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->
                        <v-btn color="success" class="mr-4 w-100" @click="handleUpdateForm">
                            แก้ไข
                        </v-btn>

                    </v-form>

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
            product: {
                product_name: "",
                product_price: "",
                product_number: "",
                description: "",
                py_id: "",
            },
            typeshow: []
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        
        try {
            const resp = await axios.get(`http://localhost:3001/api/product-get-product-id/${this.$route.params.id}`)
            this.product = resp.data.data[0]
            const resp1 = await axios.get('http://localhost:3001/api/product-type')
                this.typeshow = resp1.data
                console.log(resp1.data)
                resp1.data.forEach(element => {
                    console.log(element.product_type_name)
                });
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
    methods: {
        async handleUpdateForm() {
            try {
                const resp = await axios.patch(`http://localhost:3001/api/product/${this.$route.params.id}`, {
                    product_name: this.product.product_name,
                    product_price: this.product.product_price,
                    product_number: this.product.product_number,
                    py_id: this.product.py_id,
                    description: this.product.description,
                })
                console.log(resp.data.data)
                this.$router.push('/SL_viewproduct');
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
    },
}
</script>