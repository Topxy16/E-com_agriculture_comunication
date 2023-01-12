<template>
    <v-img src="@/assets/9.png" class="responsive">
        <v-container class="mt-5">
            <v-row class="mb-6" no-gutters>
                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto mr-5"
                            height="150" max-width="400" v-bind="props" title="จัดการร้านค้า">
                            <v-card-text class="text-center">

                                <router-link :to="`/SL_create`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-edit" variant="outlined" class="mb-2">
                                        เพิ่มสินค้า
                                    </v-btn>
                                </router-link>
                                <router-link :to="`/SL_viewproduct`" class="text-decoration-none text-black">
                                    <v-btn prepend-icon="mdi-clipboard-text" variant="outlined" class="mb-5">
                                        ดูหน้าร้านค้า
                                    </v-btn>
                                </router-link>
                            </v-card-text>

                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto mr-5"
                            height="150" max-width="400" v-bind="props"  title="จำนวนออเดอร์">
                            <v-card-text class="mt-12 text-center">
                              
                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto mr-5" 
                            height="150" max-width="400" v-bind="props"  title="ยังไม่ชำระเงิน">
                            <v-card-text class="mt-12 text-center">
                                
                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col>

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto "
                            height="150" max-width="400" v-bind="props"  title="ยังไม่จัดส่ง">
                            <v-card-text class="mt-12 text-center">
                                
                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="3">

                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto mr-5"
                            height="550" max-width="400" v-bind="props"  title="โปรไฟล์ร้านค้า">
                            <v-card-text class="mt-12 text-center">
                                
                            </v-card-text>
                        </v-card>
                    </v-hover>

                </v-col>

                <v-col cols="9">
                    <v-hover v-slot="{ isHovering, props }" open-delay="200">
                        <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                            max-width="1280" v-bind="props">
                            <v-card-text>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                รูปสินค้า
                                            </th>
                                            <th class="text-left">
                                                ชื่อ
                                            </th>
                                            <th class="text-left">
                                                ราคา
                                            </th>
                                            <th class="text-left">
                                                จำนวน
                                            </th>
                                            <th class="text-left">
                                                ราคารวม
                                            </th>
                                            <th class="text-left">
                                                ที่อยู่จัดส่ง
                                            </th>
                                            <th class="text-left">
                                                สถานะการชำระเงิน
                                            </th>
                                            <th class="text-left">
                                                สถานะการจัดส่ง
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
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
export default {
    data() {
        return {

        }
    },
}
</script>