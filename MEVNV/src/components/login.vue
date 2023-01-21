<template>
  <v-img src="@/assets/9.png" class="responsive">
    <v-container fluid>
      <v-row class="mt-5" align-center>
        <v-col cols="4"></v-col>
        <v-col cols="3" class="mt-5">
          <h1 class="mb-5">เข้าสู่ระบบ</h1>

          <form @submit.prevent="handleSubmitForm">
            <v-text-field
              v-model="user.username"
              label="ชื่อผู้ใช้งาน"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              type="password"
              label="รหัสผ่าน"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-4 w-100" type="submit">
              เข้าสู่ระบบ
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/auth/signin";

      axios
        .post(apiURL, this.user)
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.token)
          // console.log(data.data.roles)
          if(data.data.roles=='ROLE_USER'){
               this.$router.push('/BY_HOME');
          }else if(data.data.roles=='ROLE_MODERATOR'){
               this.$router.push('/SL_dashboard');
          }else{
              console.log(":D")
          }
          this.user = {
            username: "",
            password: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>