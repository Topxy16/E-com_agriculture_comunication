<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="justify-center">
                <v-col cols="6">
                    <v-card class="mx-auto" max-width="" height="750">
                        <v-card-item>
                            <div>
                                <div class="text-overline mb-1">
                                    <h1>Store</h1>
                                </div>
                                <div class="text-center mt-5">
                                    <!-- <v-avatar size="80" class="mt-5">
                                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                                    </v-avatar>

                                    <div class="text-h6 mb-1">
                                        {{ store.store_username }}                                     
                                    </div> -->
                                    <v-card class="mx-auto mt-3" max-width="600" height="150" variant="outlined">
                                        <div class="text-overline mb-1 text-left">
                                            <h3 class="ml-2">Store information</h3>
                                        </div>
                                        <div class="text-caption mt-5">
                                            <h3> ชื่อผู้ใช้งานร้านค้า : {{ store.store_username }} </h3>
                                        </div>
                                        <div class="text-caption">
                                            <h3> ชื่อร้านค้า : {{ store.store_name }} </h3>
                                        </div>
                                    </v-card>
                                    <v-card class="mx-auto mt-3" max-width="600" height="450" variant="outlined">
                                        <div class="text-overline mb-1 text-left">
                                            <h3 class="ml-2">Payment</h3>
                                        </div>
                                        <div class="text-caption">
                                            <v-img :src="(`/src/assets/${store.QrCode}`)" max-height="400" max-width=""></v-img>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </v-card-item>
                        <v-card-actions class="justify-center">
                            <v-btn variant="outlined">
                                •
                            </v-btn>
                            <v-btn variant="outlined">
                                •••
                            </v-btn>
                            <v-btn variant="outlined">
                                ••
                            </v-btn>
                            <v-btn variant="outlined">
                                •••
                            </v-btn>
                            <v-btn variant="outlined">
                                ••
                            </v-btn>
                            <v-btn variant="outlined">
                                •••••
                            </v-btn>
                            <v-btn variant="outlined">
                                ••••••
                            </v-btn>
                            <router-link :to="`/SL_storeupdate/${store.store_id}`"
                                class="text-decoration-none text-black ml-2">
                                <v-btn variant="outlined">
                                    แก้ไขข้อมูลร้านค้า
                                </v-btn>
                            </router-link>
                        </v-card-actions>
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
            product: [],
            ptype: [],
            store: [],


        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.viewProduct()
        await this.getProductType()
        await this.getStoreinfo()
        console.log(this.store)
        

    },
    methods: {
        async deleteProduct(product_id) {
            try {
                const resp = await axios.delete(`http://localhost:3001/api/product/show/${product_id}`)
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
        async showProduct(product_id) {
            try {
                const resp = await axios.patch(`http://localhost:3001/api/product/show/${product_id}`)
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
        async viewProduct() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-by-storeID`)
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
        async getProductType() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product-type')
                this.ptype = resp.data
                console.log(resp.data)
                resp.data.forEach(element => {
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
        async getStoreinfo(store_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/storeqr/${store_id}`,)
                this.store = resp.data.data[0]
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