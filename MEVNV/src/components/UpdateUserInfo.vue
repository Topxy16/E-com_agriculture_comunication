<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
            </v-row>
            <v-row no-gutters class="justify-center">

                <v-col cols="3">
                    <h2 class="mb-3">เพิ่มข้อมูลที่อยู่</h2>

                    <v-card>
                        <v-card-item>
                            <v-form ref="form">
                        <v-text-field v-model="userinfo.f_name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="userinfo.l_name" label="สกุล" required></v-text-field>

                        <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->

                        <v-btn color="success" class="mr-4 w-100" @click="handleUpdateForm">
                            แก้ไข
                        </v-btn>

                    </v-form>
                        </v-card-item>
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
            userinfo: {
                f_name: "",
                l_name: "",
                
            }

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        try {
            const resp = await axios.get(`http://localhost:3001/api/user/${this.$route.params.id}`)
            this.userinfo = resp.data.data[0]

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
    methods: {
        async handleUpdateForm() {
            try {
                const resp = await axios.patch(`http://localhost:3001/api/userinfo/${this.$route.params.id}`, {
                    f_name: this.userinfo.f_name,
                    l_name: this.userinfo.l_name,
                })
                console.log(resp.data.data)
                this.$router.push('/UserProfile')
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