<template>
    <v-container class="mt-16 d-flex justify-center">
        <v-container class="mt-xs-8 mt-md-8 d-flex justify-sm-space-around">
            <v-card
                class="mx-auto pb-2"
                min-width="300"
            >
                <div>
                    <v-img
                    class="white--text align-end"
                    height="300px"
                    :src="img_path+actualGroup.route_image"
                    >
                    </v-img>

                    <v-card-title class="pb-0">
                        <h3>{{actualGroup.name}}</h3>                    
                    </v-card-title>

                    <v-card-text class="text--primary">
                    <div class="h5">{{actualGroup.description}}</div>
                    </v-card-text>
                </div>
                <div class="d-flex flex-column">
                    <div class="mt-4 ">
                        <h3 class="mx-4">Deseos:</h3>
                        <h5 class="ml-6"> Disponibles</h5>
                    </div>
                    <div class="px-8" v-for="wish in wishes" v-bind:key="wish.name"> 
                        <div v-if="wish.available === 'yes'">
                            <v-row >
                                <v-col class="pb-0" cols="6">
                                    <h4 class="py-1">{{wish.name}}</h4>
                                </v-col>
                                <v-col  class="pa-0 ma-0" cols="6">
                                    <v-btn class="mt-2" icon color="primary" @click="selectWish(wish.id_item)" ><v-icon>mdi-gift-open-outline</v-icon></v-btn>
                                </v-col>
                            </v-row> 
                            <v-row class="pl-4">
                                <v-col class="pa-0 ma-0 h5">{{wish.description}}</v-col>    
                            </v-row> 
                            <v-row class="pl-4">
                                <v-col  class="pa-0 ma-0 "><a @click="redirect(wish.link)" class="caption">{{wish.link}}</a>  </v-col>
                            </v-row>    
                        </div>
                    </div>
                    <h5 class="mt-4 ml-6">No disponibles</h5>
                    <div class="px-8" v-for="wish in wishes" v-bind:key="wish.link"> 
                        <div v-if="wish.available === 'no'">
                            <v-row >
                                <v-col class="pb-0" cols="6">
                                    <h4 class="py-1">{{wish.name}}</h4>
                                </v-col>
                            </v-row> 
                            <v-row class="pl-4">
                                <v-col class="pa-0 ma-0"> <div class="h5">{{wish.description}}</div> </v-col>    
                            </v-row>   
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex flex-column mt-4">
                    <h3 class="mx-4">Miembros:</h3>
                    <div class="px-8" v-for="member in members" v-bind:key="member.name"> 
                        <v-row>
                            <v-col cols="6">
                                <span class="h5">{{member.name}} {{member.last_name_1}} {{member.last_name_2}}</span>
                            </v-col>
                        </v-row>               
                    </div>
                </div>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: "Group",
    data(){
        return{
            actualGroup: {

            },
            members:[

            ],
            wishes: [
                
            ],
            img_path: process.env.VUE_APP_SERVER_IMG_PATH,
            myId: this.$store.state.user.id_user
        }
    },
    async beforeMount(){
        let responseGroup = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadInfoGroup",
        {
            "id_group":this.$router.history.current.params.id
        })
        
        if (responseGroup.data[0]) {
            this.actualGroup = responseGroup.data[0]
        }

        let responseWishes = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadGroupWishes",
        {
            "id_group":this.$router.history.current.params.id
        })

        if (responseWishes.data[0]) {
            this.wishes = responseWishes.data
        }

        let responseMembers = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadGroupUsers",
        {
            "id_group":this.$router.history.current.params.id
        })
        
        if (responseMembers.data[0]) {
            this.members = responseMembers.data
        }

    },
    methods: {
        async selectWish(id){
            await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/selectWish",{
                "id_item":id
            })
            window.location.reload();
        }
    },
    computed:{
        ...mapState(['contacts'])
    },
}
</script>

<style scoped>
h2, h3{
    letter-spacing: 0.1rem;
    font-weight: 400;
    text-transform: uppercase;
}
h4, h5{
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: uppercase;
}
.h5 {
    font-size: 15px;
    font-weight:300 !important;
    text-transform: capitalize;
}
</style>