<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row no-gutters class="justify-center">
                <v-col cols="8">
                    <h3 class="mb-3">Admin table user manage</h3>
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                User_ID
                                            </th>
                                            <th class="text-left">
                                                First name
                                            </th>
                                            <th class="text-left">
                                                Last name
                                            </th>
                                            <th class="text-left">
                                                Username
                                            </th>
                                            <th class="text-left">
                                                Password
                                            </th>
                                            <th class="text-left">
                                                Tel
                                            </th>

                                            <th class="text-left">
                                                Tool
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in user" :key="user.user_id">
                                            <template v-if="!!user.user_id">
                                                <td>{{ user.user_id }}</td>
                                                <td>
                                                    {{ user.f_name }}
                                                </td>
                                                <td>
                                                    {{ user.l_name }}
                                                </td>
                                                <td>
                                                    {{ user.username }}
                                                </td>
                                                <td>
                                                    {{ user.password }}
                                                </td>
                                                <td>
                                                    {{ user.tel }}
                                                </td>

                                                <td>
                                                    <router-link :to="`/Admin_userupdate/${user.user_id}`"
                                                        class="text-decoration-none">
                                                        <v-btn color="success" class="mr-2">แก้ไขข้อมูลผู้ใช้งาน</v-btn>
                                                    </router-link>
                                                    <v-btn @click.prevent="deleteUser(user.user_id)" color="red">
                                                        ลบ
                                                    </v-btn>

                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-hover>


                </v-col>
                <v-col cols="8" class="mt-3">
                    <h3 class="mb-3">Admin table roles manage</h3>
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                User_ID
                                            </th>

                                            <th class="text-left">
                                                Username
                                            </th>


                                            <th class="text-left">
                                                Role_name
                                            </th>
                                            <th class="text-left">
                                                Tool
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in user" :key="user.user_id">
                                            <template v-if="!!user.user_id">
                                                <td>{{ user.user_id }}</td>

                                                <td>
                                                    {{ user.username }}
                                                </td>

                                                <td>                                                  
                                                    {{ user.role_name }}
                                                </td>

                                                <td>
                                                    <router-link :to="`/Admin_userupdate/${user.user_id}`"
                                                        class="text-decoration-none">
                                                        <v-btn color="success" class="mr-2">แก้ไขข้อมูลผู้ใช้งาน</v-btn>
                                                    </router-link>
                                                    <v-btn @click.prevent="deleteUser(user.user_id)" color="red">
                                                        ลบ
                                                    </v-btn>

                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-hover>
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
            role: [],
            user: [],
            store: [],

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))


    },
    async mounted() {
        await this.Roleview()
        await this.StoreView()
        console.log(this.role)
    },
    methods: {
        async deleteUser(id) {
            try {
                const resp = await axios.delete(`http://localhost:3001/api/user/${id}`)
                this.data = resp.data
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
        },
        async Roleview() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/role/get-role-name/`)
                this.user = resp.data.data
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
        async StoreView() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/store/all`)
                this.store = resp.data.data
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
        
    }
}

</script>