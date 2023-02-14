<template>
  <v-app-bar :elevation="5" color="black">
    <v-app-bar-title>E-commerce ประชาสัมพันธ์และส่งเสริมการเกษตร</v-app-bar-title>
    <template v-slot:append>

      <router-link :to="`/Login`" class="text-decoration-none text-white">
        <v-btn icon="mdi-login-variant"></v-btn>
      </router-link>
      

        <v-btn @click.prevent="Logout" icon="mdi-logout-variant"></v-btn>

        <router-link :to="`/Regis`" class="text-decoration-none text-white">
        <v-btn icon="mdi-account-plus"></v-btn>
      </router-link>
    </template>
  </v-app-bar>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <div v-for="item in userinfo" :key="item.user_id">
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
         {{ item.username }}
      </v-list-item>
    </div>
    </v-list>

    <v-divider></v-divider>

    <!-- <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-multiple" title="สมาชิก" :to="item.link1"></v-list-item>
      <v-list-item prepend-icon="mdi-account-edit" title="ตำแหน่ง" :to="item.link2"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="เพิ่มข้อมูลที่อยู่" :to="item.link9"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="โปรไฟล์" :to="item.link10"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard-edit" title="เพิ่มข้อมูลประเภทสินค้า" :to="item.link8"></v-list-item>
      <v-list-item prepend-icon="mdi-home" title="หน้าแรก" :to="item.link3"></v-list-item>
      <v-list-item prepend-icon="mdi-cart" title="ตระกร้าสินค้า" :to="item.link4"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard" title="รายละเอียดออร์เดอร์" :to="item.link7"></v-list-item>
      <v-list-item prepend-icon="mdi-store" title="ร้านค้า" :to="item.link5"></v-list-item>
      
          
      <v-list-item prepend-icon="mdi-store-edit" title="สร้างร้านค้า" :to="item.link6"></v-list-item>
    </v-list> -->
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-account" title="ผู้ใช้งาน" :to="Link.DashboardAdmin" v-if="role.role_id === 3"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="ประเภทสินค้า" :to="Link.AddProductType" v-if="role.role_id === 3"></v-list-item>
      <v-list-item prepend-icon="mdi-home" title="หน้าแรก" :to="Link.Home"></v-list-item>
      <v-list-item prepend-icon="mdi-cart" title="รถเข็น" :to="Link.Cart"></v-list-item>
      <v-list-item prepend-icon="mdi-clipboard" title="คำสั่งซื้อ" :to="Link.OrderBuyer"></v-list-item>

      <v-list-group value="Profile">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account"
            title="บัญชี"
          ></v-list-item>
        </template>

        <v-list-item
            title="ประวัติ"
            :to="Link.UserProfile"
          ></v-list-item>
          <v-list-item
            title="ที่อยู่"
            :to="Link.AddUserAddres"
            v-if="!!!address.user_a_id"
          ></v-list-item>

      </v-list-group>
      <v-list-item prepend-icon="mdi-store" title="สร้างร้านค้า" :to="Link.StoreCreate" v-if="!!!role.store_id"></v-list-item>
      <v-list-group value="Store" v-else>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-store"
            title="ร้านค้า"
          ></v-list-item>
        </template>
        
        <v-list-item prepend-icon="mdi-store" title="หน้าร้านค้า" :to="Link.Store"></v-list-item>
        <v-list-item prepend-icon="mdi-clipboard" title="คำสั่งซื้อ" :to="Link.DashboardSeller"></v-list-item>
      <v-list-group value="Product">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-shopping"
            title="สินค้า"
          ></v-list-item>
        </template>

            <v-list-item
              title="สินค้าของฉัน"
              :to="Link.ViewProduct">
            </v-list-item>
            <v-list-item
              title="เพิ่มสินค้าใหม่"
              :to="Link.AddProduct">
            </v-list-item>

      </v-list-group>
      </v-list-group>



    </v-list>
  </v-navigation-drawer>






</template>

<script>
import axios from 'axios';
import setAuthheader from "../../utils/setAuthheader";
export default {
  data() {
    return {
      role: [],
      token: '',
      userinfo: [],
      address: [],
      Link: {
        DashboardAdmin: '/Admin_dashboard',
        link2: '/Admin_role',
        Home: '/',
        Cart: '/by_cart',
        DashboardSeller: '/SL_dashboard',
        StoreCreate: '/SL_storecreate',
        OrderBuyer: '/by_order',
        AddProductType: '/SL_Ptypecreate',
        AddUserAddres: '/CreateUser_address',
        UserProfile: '/UserProfile',
        AddProduct: '/SL_productcreate',
        ViewProduct: '/SL_viewproduct',
        Store: '/sl_store',
      },
      open: ['Product'],
    }
  },
  
  async created() {
    setAuthheader(localStorage.getItem("token"))
    await this.GetInforUserbyID()
    await this.GetRoleIDMenu()
    await this.GetAddressMenu()
    console.log(this.address.user_a_id)
  },
  methods: {
    async Logout() {
      try {
        await axios.post(`http://localhost:3001/api/auth/logout`);
        this.$router.push('/login');
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
        },
    async GetRoleIDMenu(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user-role-menu/${user_id}`)
                this.role = resp.data.data[0]
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
    async GetAddressMenu(user_id) {
            try {
                const resp = await axios.get(`http://localhost:3001/api/user-address-menu/${user_id}`)
                this.address = resp.data.data[0]
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
