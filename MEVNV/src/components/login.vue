<template>
  <v-img src="@/assets/9.png" class="responsive">
    <v-container fluid>
      <v-row class="mt-5 justify-center">
        <v-col cols="3" class="mt-5">
          <h1 class="mb-5">เข้าสู่ระบบ</h1>

          <form @submit.prevent="handleSubmitForm">
            <v-text-field v-model="user.username" label="ชื่อผู้ใช้งาน" required></v-text-field>
            <v-text-field v-model="user.password" type="password" label="รหัสผ่าน" required></v-text-field>

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
import setAuthheader from "../utils/setAuthheader";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
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
            this.$router.push('/by_home');
          }

        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>