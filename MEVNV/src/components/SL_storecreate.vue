<template>
        <v-img src="@/assets/9.png" class="responsive">
            <v-container fluid>
                <v-row class="mt-5 justify-center">
                    <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">สร้างร้านค้าของคุณ</h1>

                    <v-form ref="form">

                        <v-text-field v-model="store.store_username" label="ชื่อผู้ใช้งานร้านค้า" required></v-text-field>
                        <v-text-field v-model="store.store_name" label="ชื่อร้านค้า" required></v-text-field>
                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                            สร้าง
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
            store: {
                store_username:'',
                store_name:'',
            },
        }
    },
    created(){
        setAuthheader(localStorage.getItem("token"))
    },
    methods: {
        async handleSubmitForm() {


            await axios.post('http://localhost:3001/api/store',{
                store_username:  this.store.store_username,
                store_name:  this.store.store_username,
            }).then((res) => {
                console.log(res.data.message)
                this.showAlert = true;               
                this.$router.push('/sl_dashboard');

            }).catch(error => {
                console.log(error)
                this.showAlert = true;
                this.alertMessage = error.response.data.message;
            })
        }
    },
}
</script>