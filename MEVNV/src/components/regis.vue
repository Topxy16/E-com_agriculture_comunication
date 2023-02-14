<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container>
            <v-card class="mt-5 align-self-center" color="#a8c8b1" height="600">
                <v-row class="justify-center">
                    <v-col cols="3" class="align-self-center mr-5">
                        <div ><v-img src="../assets/logo3.png"></v-img> </div>
                    </v-col>
                    <v-col cols="3" class="mt-5">
                        <h2 class="mb-2">สมัครใหม่</h2>
                        <v-card>
                            <v-card-item>
                                <v-alert v-show="showAlert" dense outlined type="error">
                                    {{ alertMessage }}
                                </v-alert>
                                <form action="post">
                                    <v-form ref="form">

                                        <v-text-field v-model="user.f_name" label="ชื่อ" required></v-text-field>
                                        <v-text-field v-model="user.l_name" label="นามสกุล" required></v-text-field>
                                        <v-text-field v-model="user.username" type="" label="ชื่อผู้ใช้งาน"
                                            required></v-text-field>
                                        <v-text-field v-model="user.password" type="password" label="รหัสผ่าน"
                                            required></v-text-field>
                                        <v-text-field v-model="user.tel" type="" label="เบอร์โทรศัพท์"
                                            required></v-text-field>

                                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                                            ยืนยัน
                                        </v-btn>

                                    </v-form>
                                </form>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
  
        </v-container>
    </v-img>
</template>

<style>

</style>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                f_name: "",
                l_name: "",
                username: "",
                password: "",
                tel: "",

            },
            showAlert: false,
            alertMessage: "",
        }
    },
    methods: {
        async handleSubmitForm() {
            await axios.post('http://localhost:3001/api/auth/sign-up', {
                f_name: this.user.f_name,
                l_name: this.user.l_name,
                username: this.user.username,
                password: this.user.password,
                tel: this.user.tel,
            }).then((res) => {
                console.log(res.data.message)
                this.showAlert = true;
                this.$router.push('/login');

            }).catch(error => {
                console.log(error)
                this.showAlert = true;
                this.alertMessage = error.response.data.message;
            })
        }
    }
}
</script>