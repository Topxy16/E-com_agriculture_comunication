<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 " align-center>
                <v-col cols="4"></v-col>
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">สมัครสมาชิกผู้ขาย</h1>

                    <v-form ref="form">

                        <v-text-field v-model="user.username" label="ชื่อผู้ใช้งาน" required></v-text-field>
                        <v-text-field v-model="user.email" label="อีเมล" required></v-text-field>
                        <v-text-field v-model="user.password" type="password" label="รหัสผ่าน" required></v-text-field>
                        
                        <v-autocomplete label="ประเภทผู้ใช้งาน" v-model="user.roles"
                            :items="roles" item-title="name" item-value="id" :return-object="false"></v-autocomplete>

                        <v-btn color="success" class="mr-4 w-100" @click="handleSubmitForm">
                            สมัครสมาชิก
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
export default {
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
                roles: [""]

            },

            roles: [
                {id:"user", name:"ผู้ซื้อ"},
                {id:"moderator", name:"ผู้ขาย"},

        ]
            
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/auth/signup';

            axios.post(apiURL, this.user).then(() => {
                this.$router.push('/login');
                this.user = {
                    username: "",
                    email: "",
                    password: "",
                    roles: [""],

                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>