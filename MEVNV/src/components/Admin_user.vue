<template>
    
        <v-container class="mt-5">
            <v-row no-gutters class="justify-center">
                <v-col cols="8">
                    <h3 class="mb-3">ข้อมูลผู้ใช้งาน</h3>
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
                    <h3 class="mb-3">สิทธิ์การใช้งาน</h3>
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
                                                Store_ID
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="role in role" :key="role.user_role_id">
                                        
                                                <td>{{ role.user_id }}</td>

                                                <td>
                                                    <div v-for="item in user" :key="item.user_id">
                                                    {{ item.user_id === role.user_id ? item.username : "" }}
                                                </div>
                                                </td>

                                                <td>                                                  
                                                    {{ role.role_id === 3 ? 'แอดมิน' : role.role_id === 2 ? 'ผู้ขาย' : role.role_id === 1 ? 'ผู้ซื้อ' : "" }}
                                                </td>

                                                <td>
                                                    {{ role.store_id === '' ? 'ไม่มีร้านค้า' : role.store_id }}
                                                </td>

                                     
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>         
            </v-row>
        </v-container>

</template>

<script>
import axios from 'axios';
import setAuthheader from "../utils/setAuthheader";
export default {
    data() {
        return {
            role: [],
            user: [],
        

        }
    },
    async created() {
        setAuthheader(localStorage.getItem("token"))
        await this.ViewinfoUser()
        await this.ViewUserRole()


    },
    methods: {
        async ViewUserRole() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user-role`)
                this.role = resp.data.data
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
        async ViewinfoUser() {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user/all`)
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
        
    }
}

</script>