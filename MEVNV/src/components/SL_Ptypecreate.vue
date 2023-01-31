<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">เพิ่มประเภทข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product_type.name" label="ประเภท" required></v-text-field>
                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click.prevent="handleSubmitForm">
                            เพิ่ม
                        </v-btn>

                    </v-form>

                </v-col>
                <v-col cols="5">
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            max-width="1280" v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                Type_id
                                            </th>
                                            <th class="text-left">
                                                Type_name
                                            </th>
                                            <th class="text-left">
                                                Tool
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in typeshow" :key="item.product_type_id">                                         
                                            <td>{{ item.product_type_name }}</td>
                                            <td>{{ item.product_type_id }}</td>                                      
                                            <td>
                                                <v-btn @click.prevent="deletePtype(item.product_type_id)" color="red">
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

<style>

</style>

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            product_type: {
                name: "",

            },
            typeshow:[],
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.getProductType()
        
    },
    methods: {
        async deletePtype(product_type_id) {
            try {
                const resp = await axios.delete(`http://localhost:3001/api/product-type/${product_type_id}`)
                this.product_type = resp.data.data
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
        async handleSubmitForm() {
            try {
                const resp = await axios.post('http://localhost:3001/api/product-type',{
                    name: this.product_type.name,
                })
                this.product_type = resp.data.data
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
                this.typeshow = resp.data.data

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