<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">สร้างร้านค้าของคุณ</h1>
                    <v-card>
                        <v-card-item>
                            <v-form ref="form">

                                <v-text-field v-model="store.store_username" label="ชื่อผู้ใช้งานร้านค้า"
                                    required></v-text-field>
                                <v-text-field v-model="store.store_name" label="ชื่อร้านค้า" required></v-text-field>
                                <v-file-input v-model="file" type="file" @change="showfile()" placeholder="Pick an image"
                            prepend-icon="mdi-camera" label="img" required>
                        </v-file-input>

                                <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                                    สร้าง
                                </v-btn>

                            </v-form>
                        </v-card-item>
                    </v-card>


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
                store_username: '',
                store_name: '',
            },
            file: "",
        }
    },
    created() {
        setAuthheader(localStorage.getItem("token"))
    },
    methods: {
        async handleSubmitForm() {
            try {
                const formData = new FormData()
                formData.append('file', this.file[0])
                formData.append('store_username', this.store.store_username)
                formData.append('store_name', this.store.store_name)
                await axios.post(`http://localhost:3001/api/store`, formData)
                this.$router.push('/login');
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
        async showfile() {
            console.log(this.file[0])
        },
    },
}
</script>