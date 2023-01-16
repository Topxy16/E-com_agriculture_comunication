<template>
    <v-container>
        <v-row>
            <!-- ดึงข้อมูล id ที่ล็อกอิน -->
            <v-col cols="12">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="200" v-bind="props">
                        <v-card-text class="mt-6 text-center">
                            <v-avatar color="surface-variant" size="80">
                                78
                            </v-avatar>
                            <h2 class="mt-2">ชื่อร้าน</h2>
                        </v-card-text>

                    </v-card>
                </v-hover>
            </v-col>

            <!-- ใส่ v-for -->
            <v-col cols="2">
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                    <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto"
                        height="400" v-bind="props">
                        <v-card-text class="">

                            <v-img cover src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                            <v-card-item>
                                <v-card-title>Cafe Badilico</v-card-title>
                            </v-card-item>

                            <v-card-text>
                                <div class="text-subtitle-1">
                                    $ • Italian, Cafe
                                </div>

                                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus
                                    patio seating.</div>
                            </v-card-text>

                        </v-card-text>

                    </v-card>
                </v-hover>
            </v-col>


        </v-row>
    </v-container>



</template>

<script>
export default {
    data: () => ({
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>