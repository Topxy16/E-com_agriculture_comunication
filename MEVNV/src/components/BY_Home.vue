<template>
    <v-container fluid>
        <v-carousel height="400" hide-delimiters progress="primary">
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet height="100%">
                    <div class="d-flex fill-height justify-center align-center">
                        <div class="text-h2">
                            {{ slide }} Slide
                        </div>
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>

        <v-row class="mt-5">
            <v-col cols="2" v-for="product in product" :key="product.product_id">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="" height="450"
                        v-bind="props">
                        <v-card-text class="">

                            <v-img cover src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                            <v-card-item>
                                <v-card-title><b> {{ product.product_name }}</b></v-card-title>
                                <v-card-text><b>by shop_name</b></v-card-text>
                            </v-card-item>

                            <v-card-text>
                                <div class="text-subtitle-1">
                                    ฿ • {{ product.product_price }}
                                </div>

                                <div>product_detail</div>
                                <div><b>จำนวนคงเหลือ : </b>{{ product.product_number }}</div>
                            </v-card-text>

                            <v-btn @click="AddProductToCart(product.product_id)" color="success justify-sticky"
                                class="mr-2 w-100">เพิ่มลงตะกร้าสินค้า</v-btn>


                        </v-card-text>

                    </v-card>
                </v-hover>
            </v-col>

        </v-row>
    </v-container>

</template>

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            product: [],
            order: [],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.getProduct()
    },
    methods: {
        async AddProductToCart(product_id) {
            console.log(product_id)
            try {
                const resp = await axios.post(`http://localhost:3001/api/create-Order-to-cart/${product_id}`, {
                    product_id: this.product.product_id
                })
                this.order = resp.data.data[0]
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
        async getProduct() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product',)
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