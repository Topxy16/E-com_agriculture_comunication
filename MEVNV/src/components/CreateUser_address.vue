<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container>
            <v-row class="justify-center mt-5">
                <v-col cols="3">
                    <h2 class="mb-3">เพิ่มข้อมูลที่อยู่</h2>
                    <v-card>
                        <v-card-item>
                            <v-form ref="form">
                                <v-text-field v-model="address.province" label="จังหวัด" required></v-text-field>
                                <v-text-field v-model="address.district" label="อำเภอ" required></v-text-field>
                                <v-text-field v-model="address.sub_district" label="ตำบล" required></v-text-field>
                                <v-text-field v-model="address.zip_code" label="รหัสไปรษณีย์" required></v-text-field>
                                <v-text-field v-model="address.address" label="รายละเอียดที่อยู่"
                                    required></v-text-field>
                                <v-text-field v-model="address.tel" label="เบอร์โทร" required></v-text-field>
                                <!-- <v-file-input v-model="img" label="img" required></v-file-input> -->
                                <v-btn color="success" class="mr-4 w-100" @click="AddAddressToInfo">
                                    Create
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
            address: [],
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))


    },
    methods: {

        async AddAddressToInfo() {
            try {
                const resp = await axios.post(`http://localhost:3001/api/useradd`, {
                    address: this.address.address,
                    sub_district: this.address.sub_district,
                    district: this.address.district,
                    province: this.address.province,
                    zip_code: this.address.zip_code,
                    tel: this.address.tel,
                })
                this.$router.push('/UserProfile');

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