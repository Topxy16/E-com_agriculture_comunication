<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">เพิ่มข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.product_name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="product.description" label="รายละเอียด" required></v-text-field>


                        <v-autocomplete label="เลือกประเภท" v-model="product.product_type_id" :items="typeshow"
                            item-title="product_type_name" item-value="product_type_id" :return-object="false">
                        </v-autocomplete>

                        <v-text-field v-model="product.product_price" label="ราคา" required></v-text-field>
                        <v-text-field v-model="product.product_number" label="จำนวน" required></v-text-field>
                        <v-img :src="image ? imagePreview : 'https://picsum.photos/id/11/100/60'"
                            lazy-src="https://picsum.photos/id/11/100/60" max-width="150"></v-img>
                        <v-file-input v-model="image" accept="image/png, img/jpg" placeholder="Pick an image"
                            prepend-icon="mdi-camera" @change="selectImage" @click:clear="clearImagePreview()"
                            label="img" required>
                        </v-file-input>
                        <div class="preview-images">

                        </div>
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
                product_type_id: '',
                description: '',
                product_name: '',
                product_price: '',
                product_number: ''
            },
            typeshow: [],
            image: "",
            imagePreview: "",
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.getProductType()
        console.log(this.typeshow.product_type_id)

    },
    methods: {
        async selectImage(e) {
            const file = e
            if (!file) return

            const readData = (f) => new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.readAsDataURL(f)
            })
            const data = await readData(file)
            this.imagePreview = data
        },
        async clearImagePreview() {
            this.imagePreview = ""
        },
        async handleSubmitForm() {
            try {
                const resp = await axios.post('http://localhost:3001/api/product', {
                    product_type_id: this.product.product_type_id,
                    product_name: this.product.product_name,
                    product_price: this.product.product_price,
                    product_number: this.product.product_number,
                    description: this.product.description,
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
        async getProductType() {
            try {
                const resp = await axios.get('http://localhost:3001/api/product-type')
                this.typeshow = resp.data
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
        async UploadImage() {
            try {
                const resp = await axios.get('http://localhost:3001/api/upload/product',{
                    image: this.image,
                    product_id: this.product_id
                })
                this.image = resp.data
                
              
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