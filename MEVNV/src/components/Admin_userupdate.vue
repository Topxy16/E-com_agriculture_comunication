<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5">
                <v-col cols="3" sm="6" offset-sm="3" class="mt-5">
                    <h1 class="mb-5">แก้ไขข้อมูลสินค้า</h1>

                    <v-form ref="form">

                        <v-text-field v-model="user.user_id" disabled="ture" label="UserID" required></v-text-field>
                        <v-text-field v-model="user.f_name" label="ชื่อ" required></v-text-field>
                        <v-text-field v-model="user.l_name" label="สกุล" required></v-text-field>
                        <v-text-field v-model="user.username" label="ชื่อผู้ใช้งาน" required></v-text-field>
                        <v-text-field v-model="user.password" label="รหัสผ่าน" required></v-text-field>
                        <v-text-field v-model="user.tel" label="เบอร์โทรศัพท์" required></v-text-field>
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
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            user: {
                f_name: "",
                l_name: "",
                username: "",
                password: "",
                tel: "",
            }
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        try {
            const resp = await axios.get(`http://localhost:3001/api/user/${this.$route.params.id}`)
            this.user = resp.data.data[0]
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
            const resp = await axios.patch(`http://localhost:3001/api/user/${this.$route.params.id}`,{
                f_name: this.user.f_name,
                l_name: this.user.l_name,
                username: this.user.username,
                password: this.user.password,
                tel: this.user.tel,
            })
            console.log(resp.data.data)
            // this.$router.push('/Admin_dashboard')
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
        }
    }
}
</script>