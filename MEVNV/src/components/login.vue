<template>
  <v-img src="@/assets/9.png" class="responsive">
    <v-container>    
      <v-card class="mt-5 align-self-center" color="#a8c8b1" height="">
                <v-row class="justify-center">
                    <v-col cols="3" class="align-self-center mr-5">
                        <div><v-img src="../assets/logo3.png" max-height="360"></v-img></div>
                    </v-col>
                    <v-col cols="3" class="align-self-center">
                        <h2 class="mb-2">เข้าสู่ระบบ</h2>
                        <v-card>
                            <v-card-item>
                                <v-alert v-show="showAlert" dense outlined type="error">
                                    {{ alertMessage }}
                                </v-alert>
                            
                                  <form @submit.prevent="handleSubmitForm">
            <v-text-field v-model="user.username" label="ชื่อผู้ใช้งาน" required></v-text-field>
            <v-text-field v-model="user.password" type="password" label="รหัสผ่าน" required></v-text-field>

            <v-btn color="success" class="mr-4 w-100" type="submit">
              เข้าสู่ระบบ
            </v-btn>
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
import axios from "axios";
import setAuthheader from "../utils/setAuthheader";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      showAlert: false,
      alertMessage: "",
    }
  },

  methods: {
    async handleSubmitForm() {
      await axios.post("http://localhost:3001/api/auth/login", {
        username: this.user.username,
        password: this.user.password,
      })
        .then((data) => {
          console.log(data.data.user.role_name);
          localStorage.setItem("token", data.data.token)
          setAuthheader(data.data.token)
          if (data.data.user.role_name == "Admin") {
            this.$router.push('/Admin_dashboard');
     
          } else if (data.data.user.role_name == "store") {
            this.$router.push('/sl_dashboard');
            
          } else {
            this.$router.push('/');
        
          }

        })
        .catch((error) => {
          console.log(error);
          this.showAlert = true;
                this.alertMessage = error.response.data.msg || error.response.data.message
        });
    },
  }
};
</script>