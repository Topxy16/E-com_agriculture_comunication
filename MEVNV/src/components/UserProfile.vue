<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="justify-center">
                <v-col cols="6">
                    <v-card class="mx-auto" max-width="" height="700">
                        <v-card-item v-for="item in userinfo " :key="item.user_id">
                            <div>
                                <div class="text-overline mb-1">
                                    <h1>Profile</h1>
                                </div>
                                <div class="text-center mt-5">
                                    <v-avatar size="80" class="mt-5">
                                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                                    </v-avatar>

                                    <div class="text-h6 mb-1">
                                        {{ item.username }}
                                    </div>
                                    <v-card class="mx-auto mt-3" max-width="600" height="150" variant="outlined">
                                        <div class="text-overline mb-1 text-left">
                                            <h3 class="ml-2">Personal information</h3>
                                        </div>
                                        <div class="text-caption mt-5">
                                            <h3> Frist Name : {{ item.f_name }} </h3>
                                        </div>
                                        <div class="text-caption">
                                            <h3> Last Name : {{ item.l_name }} </h3>
                                        </div>
                                    </v-card>
                                    <v-card class="mx-auto mt-3" max-width="600" height="150" variant="outlined"
                                        v-for="item in address " :key="item.user_id">

                                        <div class="text-overline mb-1 text-left">
                                            <h3 class="ml-2">Address</h3>
                                        </div>
                                        <div class="text-caption">
                                            <h3> รายละเอียดที่อยู่ : {{ item.address }} </h3>
                                            <h3> จังหวัด : {{ item.province }} อำเภอ : {{ item.district }}
                                                ตำบล : {{ item.sub_district }} รหัสไปรษณีย์ : {{ item.zip_code }} </h3>
                                            <h3> เบอร์โทร : 0{{ item.tel }} </h3>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </v-card-item>


                        <v-card-actions class="justify-center" v-for="item in address " :key="item.user_id">
                            <v-btn variant="outlined">
                                •
                            </v-btn>
                            <v-btn variant="outlined">
                                •••
                            </v-btn>
                            <v-btn variant="outlined">
                                ••
                            </v-btn>
                            <v-btn variant="outlined">
                                •••
                            </v-btn>
                            <v-btn variant="outlined">
                                •••••••••••
                            </v-btn>
                            <router-link :to="`/UpdateUser_address/${item.user_a_id}`"
                                class="text-decoration-none text-black ml-2">
                                <v-btn variant="outlined">
                                    แก้ไขที่อยู่
                                </v-btn>
                            </router-link>
                            <router-link :to="`/UpdateUserInfo/${item.user_id}`"
                                class="text-decoration-none text-black ml-2">
                            <v-btn variant="outlined">
                                แก้ไขข้อมูลส่วนตัว
                            </v-btn>
                        </router-link>
                        </v-card-actions>


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
            userinfo: [],
            address: [],
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.GetAddressbyID()
        await this.GetInforUserbyID()
        console.log(this.address)
        console.log(this.userinfo)
        document.title = 'Profile'

    },
    methods: {
        async GetAddressbyID(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/useraddinfor/${user_id}`)
                this.address = resp.data.data

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
        async GetInforUserbyID(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/userinfor/${user_id}`)
                this.userinfo = resp.data.data
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