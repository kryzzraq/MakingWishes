<template>
    <v-container class="mt-16 d-flex justify-center">
        <v-container class="mt-xs-8 mt-md-12 d-flex justify-sm-space-around">
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
                    <div>{{actualGroup.description}}</div>
                    </v-card-text>
                </div>
                <div class="d-flex flex-column">
                    <h3 class="mt-4 mx-4">Deseos:</h3>
                    <div class="px-8" v-for="wish in wishes" v-bind:key="wish.name"> 
                        <v-row class="pt-4">
                            <v-col class="pb-0" cols="6">
                                 <h4 class="py-1">{{wish.name}}</h4>
                            </v-col>
                            <v-col  class="pa-0 ma-0" cols="6">
                                <v-btn class="pt-4" icon color="red" @click="deleteWish(wish.id_item)" ><v-icon> mdi-trash-can-outline</v-icon></v-btn>
                            </v-col>
                        </v-row> 
                        <v-row class="pl-4">
                            <v-col class="pa-0 ma-0"> <div class="caption">{{wish.description}}</div> </v-col>    
                        </v-row> 
                        <v-row class="pl-4">
                            <v-col class="pa-0 ma-0"><a @click="redirect(wish.link)" class="caption">{{wish.link}}</a>  </v-col>
                        </v-row>
                           
                                     
                    </div>
                    
                    <v-dialog
                        v-model="addWish"
                        persistent
                        max-width="600px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            class="ml-4 align-self-end" 
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            text
                            >
                            Añadir deseo
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="title">
                                <h3 class="mt-8 white--text ">Guardar deseo:</h3>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
                                    v-model="new_wish.wish_name"
                                    elevation="4"
                                    label="Nombre del deseo"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                    v-model="new_wish.wish_description"
                                    name="input-7-4"
                                    label="Descripción del deseo"
                                    height="100px"
                                    hint="Máximo 1000 caracteres."
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                     v-model="new_wish.wish_link"
                                    label="Link"
                                    required
                                    ></v-text-field>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="saveWish"
                            >
                                Guardar
                            </v-btn>
                            <v-btn
                                color="secondary"
                                text
                                @click="addWish = false"
                            >
                                Cerrar
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </div>
                <div class="d-flex flex-column">
                    <h3 class="mx-4">Miembros:</h3>
                    <div class="px-8" v-for="member in members" v-bind:key="member.name"> 
                        <v-row>
                            <v-col cols="6">
                                <h4>{{member.name}} {{member.last_name_1}} {{member.last_name_2}}</h4>
                            </v-col>
                            <v-col  class="pa-0 ma-0" cols="6">
                                <v-btn class="pt-1" icon color="red"><v-icon> mdi-trash-can-outline</v-icon></v-btn>
                            </v-col>
                        </v-row>               
                    </div>
                    <v-btn text class="ml-4 align-self-end" color="primary">Añadir miembro</v-btn>
                </div>                
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "OwnGroup",
    data(){
        return{
            actualGroup: {

            },
            members:[

            ],
            wishes: [
                
            ],
            addWish: false,
            addContact: false,
            img_path: process.env.VUE_APP_SERVER_IMG_PATH,
            new_wish: {
                "wish_name":"",
                "wish_description":"",
                "wish_link":""
            }
        }
    },
    async beforeMount(){
        let responseGroup = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadOwnGroup",
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
        async deleteWish(id){
            await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/deleteWishGroup",{
                "id_item": id,
                "id_group": this.actualGroup.id_group 
            })

            await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/deleteWishItem",{
                "id_item": id,
            })
            window.scrollTo(0,0)
            window.location.reload();
        },
        async saveWish() {            
            let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/createWishGroup",{
                "wish_name":this.new_wish.wish_name,
                "wish_description": this.new_wish.wish_description,
                "wish_link": this.new_wish.wish_link,
                "id_group": this.actualGroup.id_group
            })
            window.scrollTo(0,0)
            window.location.reload();
        },
        redirect(url) {
            window.open('http://'+url, '_blank');
        }
    }

    
}
</script>


<style scoped>
h2, h3{
    letter-spacing: 0.20rem;
    font-weight: 400;
    text-transform: uppercase;
}
h4{
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: uppercase;
}
.title{
    background-color: #F50057;
    padding-bottom: 40px !important;
    font-weight: 500 !important;
}
</style>