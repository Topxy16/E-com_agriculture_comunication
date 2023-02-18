<template>
    
    <v-container>


        <v-row>
            <v-col>
                <v-card class="mx-auto" color="grey-lighten-3" max-width="">
                    <v-card-text>
                        <v-text-field :loading="loading" density="compact" variant="solo" label="ค้นหาสินค้า" v-model="Seach.product_name"
                            append-inner-icon="mdi-magnify" single-line hide-details
                            @keydown.enter="SeachProduct(Seach.product_name,Seach.product_type_name)"></v-text-field>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>

        <v-alert v-show="showAlert" dense outlined type="success">{{ alertMessage }}</v-alert>
        <v-row class="">
            
            <v-col cols="2" v-for="product in product" :key="product.product_id" >
                <v-card :loading="loading" class="mx-auto my-12" max-width="280" v-if="product.product_show === 1 && product.product_number != 0">
                    <template v-slot:loader="{ isActive }">
                        <v-progress-linear :active="isActive" color="deep-purple" height="4"
                            indeterminate></v-progress-linear>
                    </template>

                    <v-img cover height="250" :src="(`/src/assets/${product.image}`)"></v-img>

                    <v-card-item>
                        <v-card-title>{{ product.product_name }}</v-card-title>

                        <v-card-subtitle>
                            <span class="me-1" v-for="store in store" :key="store.store_id">{{product.store_id === store.store_id ? store.store_name : ""}}</span>

                            <v-icon color="error" icon="mdi-store" size="small"></v-icon>

                        </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <div v-for="item in producttype" :key="item.product_type_id">{{ item.product_type_id === product.py_id ? item.product_type_name :'' }}</div>

                        </v-row>

                        <div class="my-4 text-subtitle-1">
                            $ • {{ product.product_price }}
                        </div>

                        <div>{{ product.description }}</div>
                    </v-card-text>


                    <v-card-actions class="justify-end">
                        <v-btn color="info" variant="text" @click="AddProductToCart(product.product_id,product.store_id,product.image)">
                            เพิ่มลงตะกร้าสินค้า
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<style scoped>

</style>+

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            title: this.$route.name,
            product: [],
            producttype: [],
            store: [],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            loaded: false,
            loading: false,
            showAlert: false,
            alertMessage: "",
            Seach: {
                product_name: "",
                product_type_name: ""

            }
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.getProduct()
        await this.getStoreinfo()
        await this.getProductType()
        document.title = 'Home'
    },
    methods: {
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },
        async AddProductToCart(product_id, store_id, image) {
            try {
                const resp = await axios.post(`http://localhost:3001/api/create-Order-to-cart/${product_id},${store_id},${image}`, {
                    product_id: this.product.product_id,
                    store_id: this.product.store_id,
                    image: this.product.image
                })
                this.order = resp.data.data
                this.showAlert = true;
                this.alertMessage = resp.data.message
                
            } catch (e) {
                if (e.response.status === 403) {
                    alert("Token Exception")
                    this.$router.push('/login');
                } else if (e.response.status === 401) {
                    alert("Go to Login")
                    this.$router.push('/login');
                }
                console.log(e)
            }
        },
        async SeachProduct(product_name,product_type_name) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product/search?product_name=${product_name}&product_type_name=${product_type_name}`, {
                    product_name: this.Seach.product_name,
                    product_type_name: this.Seach.product_type_name
                })  
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
        },
        async getProductType() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product-type',)
                this.producttype = resp.data
                console.log(this.producttype.product_type_name)
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
        async getStoreinfo() {
            try {
                const resp = await axios.get('http://localhost:3001/api/storeinfo/byhome',)
                this.store = resp.data.data
                console.log(this.store)
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