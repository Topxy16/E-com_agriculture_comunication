<template>

    <v-img src="@/assets/9.png" class="responsive">
        <v-container fluid>
            <v-row class="mt-5 justify-center">
                <v-col cols="3" class="mt-5">
                    <h1 class="mb-5">แก้ไขข้อมูลร้านค้า</h1>
                    <v-card>
                        <v-card-item>
                            <v-form ref="form">

                                <v-text-field v-model="store.store_username" label="ชื่อสินค้า" required></v-text-field>
                                <v-text-field v-model="store.store_name" label="รายละเอียด" required></v-text-field>
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
            store: {
                store_username: "",
                store_name: "",
            },
        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))

        try {
            const resp = await axios.get(`http://localhost:3001/api/store/${this.$route.params.id}`)
            this.store = resp.data.data[0]
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
    methods: {
        async handleUpdateForm() {
            try {
                const resp = await axios.patch(`http://localhost:3001/api/store/name/${this.$route.params.id}`, {
                    store_username: this.store.store_username,
                    store_name: this.store.store_name,
                })
                console.log(resp.data.data)
                this.$router.push('/SL_store');
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
    },
}
</script>