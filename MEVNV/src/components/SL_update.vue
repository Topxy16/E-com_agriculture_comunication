<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5">
                <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">แก้ไขข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="product.name"  required></v-text-field>
                        <v-text-field v-model="product.detail"  required></v-text-field>
                        <v-text-field v-model="product.price"  required></v-text-field>
                        <v-text-field v-model="product.qty"  required></v-text-field>
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

export default {
    data() {
        return {
            product: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.product = res.data
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update/${this.$route.params.id}`;

            axios.put(apiURL, this.product).then((res) => {
                console.log(res);
                this.$router.push('/SL_viewproduct')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>