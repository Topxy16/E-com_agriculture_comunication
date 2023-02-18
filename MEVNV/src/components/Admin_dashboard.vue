<template>
    <v-sheet color="#E5E0FF">
    <v-container class="">
        <v-row no-gutters class="justify-center">
            <v-col cols="2" class="mr-7">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="300" max-width="300" v-bind="props" color="#7286D3">
                        <v-card-text class="text-center text-white">
                            <v-btn class="mt-15" color="#E5E0FF" icon="mdi-cash-100" size="70"></v-btn>
                            <h1 class="mt-16"> {{ productsumprice }} </h1>
                            <h3 class="mt-5"> เงินที่ไหลเวียนในระบบ </h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="2" class="mr-7">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="300" max-width="300" v-bind="props" color="#7286D3">
                        <v-card-text class="text-center text-white">
                            <v-btn class="mt-15" color="#E5E0FF" icon="mdi-account" size="70"></v-btn>
                            <h1 class="mt-16"> {{ AllUserCount }} </h1>
                            <h3 class="mt-5"> ผู้ใช้งาน </h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="2" class="mr-7">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="300" max-width="300" v-bind="props" color="#7286D3">
                        <v-card-text class="text-center text-white">
                            <v-btn class="mt-15" color="#E5E0FF" icon="mdi-store" size="70"></v-btn>
                            <h1 class="mt-16"> {{ AllStoreCount }} </h1>
                            <h3 class="mt-5"> ร้านค้า </h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="2" class="">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="300" max-width="300" v-bind="props" color="#7286D3">
                        <v-card-text class="text-center text-white">
                            <v-btn class="mt-15" color="#E5E0FF" icon="mdi-shopping" size="70"></v-btn>
                            <h1 class="mt-16"> {{ AllProductCount }} </h1>
                            <h3 class="mt-5"> สินค้า </h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="6" class="mt-8">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                        class="mx-auto ml-7 text-white" height="" max-width="840" v-bind="props" color="#8EA7E9"
                        title="ผู้ใช้งาน">
                        <v-card-text class="">
                            <v-table theme="#E5E0FF">
                                <thead>
                                    <tr>
                                        <th class="">
                                            ไอดีผู้ใช้งาน
                                        </th>

                                        <th class="">
                                            ชื่อผู้ใช้งาน
                                        </th>


                                        <th class="">
                                            สิทธิ์การใช้งาน
                                        </th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="role in role" :key="role.user_role_id">
                                        <td>{{ role.user_id }}</td>
                                        <td>
                                            <div v-for="item in user" :key="item.user_id">
                                                {{ item.user_id === role.user_id ? item.username : "" }}
                                            </div>
                                        </td>

                                        <td>
                                            {{ role.role_id === 3 ? 'แอดมิน' : role.role_id === 2 ? 'ผู้ขาย' : role.role_id
                                                === 1 ? 'ผู้ซื้อ' : "" }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="3" class="mt-8">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                        class="mx-auto text-white mr-9" height="540" max-width="600" v-bind="props" color="#8EA7E9"
                        title="สิทธิ์การใช้งาน">
                        <v-card-text class="text-center">
                            <v-btn class="mt-5" color="#E5E0FF" icon="mdi-account" size="70"></v-btn>
                            <h1 class="mt-10"> {{ AllBuyCount }} </h1>
                            <h3 class="mt-5"> ผู้ซื้อ </h3>
                            <v-btn class="mt-15" color="#E5E0FF" icon="mdi-account-voice" size="70"></v-btn>
                            <h1 class="mt-10"> {{ AllSellCount }} </h1>
                            <h3 class="mt-5"> ผู้ขาย </h3>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="9" class="mt-8">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto text-white"
                        height="" max-width="1265" v-bind="props" color="#7286D3" title="ประเภทสินค้า">
                        <v-card-text class="text-center">
                            <v-row>
                                <v-col cols="3" class="">
                                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                                            class="mx-auto" height="300" max-width="300" v-bind="props" color="#8EA7E9">
                                            <v-card-text class="text-center text-white">
                                                <v-btn class="mt-15" color="#E5E0FF" icon="mdi-flower"
                                                    size="70"></v-btn>
                                                <h1 class="mt-16"> {{ AllflowerCount }} </h1>
                                                <h3 class="mt-5"> ดอกไม้ </h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                                <v-col cols="3" class="">
                                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                                            class="mx-auto" height="300" max-width="300" v-bind="props" color="#8EA7E9">
                                            <v-card-text class="text-center text-white">
                                                <v-btn class="mt-15" color="#E5E0FF" icon="mdi-fruit-cherries"
                                                    size="70"></v-btn>
                                                <h1 class="mt-16"> {{ AllfruitCount }} </h1>
                                                <h3 class="mt-5"> ผลไม้ </h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                                <v-col cols="3" class="">
                                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                                            class="mx-auto" height="300" max-width="300" v-bind="props" color="#8EA7E9">
                                            <v-card-text class="text-center text-white">
                                                <v-btn class="mt-15" color="#E5E0FF" icon="mdi-palm-tree"
                                                    size="70"></v-btn>
                                                <h1 class="mt-16"> {{ AlltreeCount }} </h1>
                                                <h3 class="mt-5"> ต้นไม้ </h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                                <v-col cols="3" class="">
                                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                                            class="mx-auto" height="300" max-width="300" v-bind="props" color="#8EA7E9">
                                            <v-card-text class="text-center text-white">
                                                <v-btn class="mt-15" color="#E5E0FF" icon="mdi-corn"
                                                    size="70"></v-btn>
                                                <h1 class="mt-16"> {{ AllvegetCount }} </h1>
                                                <h3 class="mt-5"> ผัก </h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</v-sheet>
</template>

<style scoped>
.template {
  background-color: #00a86b;
}
</style>

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            role: [],
            user: [],
            store: [],
            product: [],
            buy: [],
            sell: [],
            flower: [],
            fruit: [],
            tree: [],
            veget: [],
            sumprice: [],
            productsumprice: 0,


        }
    },
    computed: {
        AllUserCount() {
            return this.user.length;
        },
        AllStoreCount() {
            return this.store.length;
        },
        AllProductCount() {
            return this.product.length;
        },
        AllSellCount() {
            return this.sell.length;
        },
        AllBuyCount() {
            return this.buy.length;
        },
        AllflowerCount() {
            return this.flower.length;
        },
        AllvegetCount() {
            return this.veget.length;
        },
        AllfruitCount() {
            return this.fruit.length;
        },
        AlltreeCount() {
            return this.tree.length;
        },
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.ViewinfoUser()
        await this.ViewUserRole()
        await this.ViewStore()
        await this.ViewProduct()
        await this.ViewSell()
        await this.ViewBuy()
        await this.ViewFlower()
        await this.ViewVeget()
        await this.ViewTree()
        await this.ViewFruit()
        await this.ViewSumprice()
        document.title = 'Admin Dashboard'



    },
    methods: {
        async ViewUserRole() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user-role`)
                this.role = resp.data.data
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
        async ViewinfoUser() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user/all`)
                this.user = resp.data.data
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
        async ViewStore() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/storeinfo/byhome`)
                this.store = resp.data.data
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
        async ViewProduct() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product`)
                this.product = resp.data.data
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
        async ViewSell() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/role/sell`)
                this.sell = resp.data.data
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
        async ViewBuy() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/role/buy`)
                this.buy = resp.data.data
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
        async ViewVeget() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-type/veget`)
                this.veget = resp.data.data
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
        async ViewFruit() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-type/fruit`)
                this.fruit = resp.data.data
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
        async ViewFlower() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-type/flower`)
                this.flower = resp.data.data
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
        async ViewTree() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/product-type/tree`)
                this.tree = resp.data.data
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
        async ViewSumprice() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/Order/sumprice`)      
                this.sumprice = resp.data.data      
                resp.data.data.forEach(element => {
                    this.productsumprice = (element.product_price*element.product_number) + this.productsumprice
                });
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
    }
}

</script>