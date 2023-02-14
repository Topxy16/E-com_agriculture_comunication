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
                        <v-text-field v-model="address.province" label="จังหวัด" required></v-text-field>
                        <v-text-field v-model="address.district" label="อำเภอ" required></v-text-field>
                        <v-text-field v-model="address.sub_district" label="ตำบล" required></v-text-field>
                        <v-text-field v-model="address.zip_code" label="รหัสไปรษณีย์" required></v-text-field>
                        <v-text-field v-model="address.address" label="รายละเอียดที่อยู่" required></v-text-field>
                        <v-text-field v-model="address.tel" label="เบอร์โทร" required></v-text-field>
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
            address: {
                province: "",
                district: "",
                sub_district: "",
                zip_code: "",
                address: "",
                tel: "",
            }

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        try {
            const resp = await axios.get(`http://localhost:3001/api/useradd/${this.$route.params.id}`)
            this.address = resp.data.data[0]

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
                const resp = await axios.patch(`http://localhost:3001/api/useradd/${this.$route.params.id}`, {
                    province: this.address.province,
                    district: this.address.district,
                    sub_district: this.address.sub_district,
                    zip_code: this.address.zip_code,
                    address: this.address.address,
                    tel: this.address.tel,
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