<template>
<v-container class="py-12 py-md-16" :key="forceRender">
    <v-snackbar
        v-if="wrongData"
        v-model="wrongData"
        :timeout="5000"
        color="secondaryMedium"
        dark
        top
        transition="fade-transition"
    >
        Alguno de los datos no cumple con los requisitos especificados.
        <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="wrongData = false"
        >
            Ok
        </v-btn>
        </template>
    </v-snackbar>
    <v-snackbar
        v-if="savedWish"
        v-model="savedWish"
        :timeout="3000"
        color="secondaryMedium"
        dark
        top
        transition="fade-transition"
    >
        Deseo guardado correctamente
        <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="savedWish = false"
        >
            Ok
        </v-btn>
        </template>
    </v-snackbar>
    <div v-if="Object.keys(this.wishes).length === 0" class="mt-10 d-flex flex-column align-center px-4">
        <h3 class="text-center">
          Vaya... Parece que aún no tienes ningún deseo en tu lista.
        </h3>
        <h4 class="py-4 text--secondary">¿Qué te parece si añades alguno?</h4>
           
    </div>
    <div v-else class="mt-10 d-flex flex-column align-center px-4">
        <h3 class="text-center my-3">En salmón aparecerán los deseos que aún tienes disponibles</h3>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="item in wishes" v-bind:key="item.id_item" class="">
                <v-card
                v-if="item.available === 'yes'"
                color="primaryLight"
                dark
                width="300px"
                min-height="200px"
                class="ma-2 d-flex flex-column justify-space-between"
            >
                <v-card-title class="text-uppercase">{{item.name}}</v-card-title>

                <v-card-subtitle class="py-0">{{item.description}}</v-card-subtitle>
                <v-card-subtitle class="text-lowercase caption py-0 pt-4"><a class="text-white">{{item.link}}</a></v-card-subtitle>

                <v-card-actions>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon 
                            @click="deleteWish(item.id_item)">
                                <v-icon> mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Borrar de mi lista de deseos</span>
                        </v-tooltip>
                </v-card-actions>
            </v-card>
            </div>
        </div>
        <h3 class="text-center my-3 mt-16">Sin embargo, en gris aparecerán los que ya han sido seleccionados</h3>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="item in wishes" v-bind:key="item.id_item">
                <v-card
                v-if="item.available === 'no'"
                color="secondaryLight"
                dark
                width="300px"
                min-height="150px"
                class="ma-2 d-flex flex-column justify-space-between"
            >
                <v-card-title class="text-uppercase">{{item.name}}</v-card-title>

                <v-card-subtitle>{{item.description}}</v-card-subtitle>
                <v-card-subtitle class="text-lowercase caption py-0"><a>{{item.link}}</a></v-card-subtitle>

                <v-card-actions>
                </v-card-actions>
            </v-card>
            </div>
        </div>
    </div>
        <v-container min-width="300px" class="pb-8 mt-10 d-flex flex-column align-center px-4">
        <div class="pa-4">Aquí podrás añadir todos los deseos que quieras que los demás conozcan.</div>
            <v-expansion-panels hover >
                <v-expansion-panel>
                    <v-expansion-panel-header ripple>Despliega si quieres saber más acerca de las listas de deseos:</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div>Las listas de deseos se conforman de los siguientes elementos:</div>
                        <v-list-item v-for="item in description" v-bind:key="item.name">
                            <v-list-item-content>
                                <v-list-item-title>{{item.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                                 <v-list-item-subtitle class="caption">{{item.example}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-container>
        <v-container class="d-flex justify-center">
            <v-card width="100%" min-width="300px" elevation="10" color="secondaryLight">
                <v-card-text>
                    <span class="white--text">Nombre del deseo:</span>
                    <div class="err" >
                        <div v-if="$v.new_wish.wish_name.$dirty && !$v.new_wish.wish_name.required">Este campo es requerido.</div>
                    </div>
                    <v-text-field 
                        solo dense
                         v-model.trim="$v.new_wish.wish_name.$model"
                    ></v-text-field>
                    <span class="white--text" >Descripción del deseo:</span>
                    <div class="err" >
                        <div v-if="$v.new_wish.wish_description.$dirty && !$v.new_wish.wish_description.required">Este campo es requerido.</div>
                        <div v-if="$v.new_wish.wish_description.$dirty && !$v.new_wish.wish_description.maxLength">Máximo 1000 caracteres.</div>
                    </div>
                    <v-textarea
                        v-model.trim="$v.new_wish.wish_description.$model"
                        solo
                        name="input-7-4"
                        hint="Máximo 1000 caracteres"
                        height="100px"
                        label="Máximo 1000 caracteres."
                        ></v-textarea>
                    <span class="white--text">Link del deseo:</span>
                    <div class="err" >
                        <div v-if="$v.new_wish.wish_link.$dirty && !$v.new_wish.wish_link.required">Este campo es requerido.</div>
                        <div v-if="$v.new_wish.wish_link.$dirty && !$v.new_wish.wish_link.maxLength">Máximo 600 caracteres.</div>
                    </div>
                    <v-text-field 
                       v-model.trim="$v.new_wish.wish_link.$model"
                        solo dense
                    ></v-text-field>
                </v-card-text>
                <v-card-text class="d-flex justify-end">
                    <v-btn @click="cleanData" text color="white" class="mr-2">Limpiar</v-btn>
                    <v-btn @click="createNewWish" color="primary">Enviar</v-btn>
                </v-card-text>
            </v-card>
        </v-container>
</v-container>
    
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {required, maxLength} from "vuelidate/lib/validators";

export default {
    name: "wishes",
    data() {
        return {
            description: [
                {
                    "name": "Nombre:",
                    "description": "Nombre descriptivo del deseo.",
                    "example": "Por ejemplo: Camisa."
                },
                {
                    "name": "Descripción:",
                    "description": "Breve descripción del deseo.",
                    "example": "Color crudo, cuello mao, manga abullonada."
                },
                {
                    "name": "Link:",
                    "description": "Link de compra.",
                    "example": "https://www.zara.com/es/es/camisa-solapa-bordada-p03564096.html?v1=108980157&v2=1718175"
                },
                {
                    "name": "Disponibilidad:",
                    "description": "Aquí se muestra si alguien ha seleccionado ya tu deseo o no.",
                    "example": ""
                }
            ],
            new_wish: {
                "wish_name":"",
                "wish_description":"",
                "wish_link":""
            },
            wrongData: false,
            savedWish: false,
            forceRender: 0,
            wishes: []
        }
    },
    methods: {
        cleanData(){
            this.new_wish.wish_name=""
            this.new_wish.wish_description=""
            this.new_wish.wish_link=""
        },
        async createNewWish(){
            if (!this.$v.$invalid) {
               let response = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/createWish",
                {
                    "wish_name": this.new_wish.wish_name,
                    "wish_description": this.new_wish.wish_description,
                    "wish_link": this.new_wish.wish_link
                });

                if (response.data.text){
                    this.savedWish = true
                    let responseWishes = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadUserWishes");
                    this.wishes = responseWishes.data
                    this.forceRender += 1

                    this.new_wish.wish_name = ""
                    this.new_wish.wish_description = ""
                    this.new_wish.wish_link = ""
                }
                
            } else {
                this.wrongData = true
            }
        },
        async deleteWish(id){
            let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/deleteWish", {
                "id_item": id
            })

            if (response.data.text) {
                let responseWishes = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadUserWishes");
                this.wishes = responseWishes.data
            }
            this.forceRender += 1
        }
    },
    computed:{
        ...mapState()
    },
    async beforeMount(){
        let responseWishes = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadUserWishes");
        this.wishes = responseWishes.data
    },
    validations: {
        new_wish: {
            wish_description: {
                required,
                maxLength: maxLength(1000)
            },
            wish_name: {
                required
            },
            wish_link: {
                required,
                maxLength: maxLength(600)
            }
        }
    }
}
</script>
<style scoped>
h3, h4 {
    letter-spacing: 0.26rem;
    font-weight: 400;
    text-transform: uppercase;
}
.v-list-item__subtitle{
    white-space: inherit;
}
.err{
    color: black;
    font-size: 11px;
}
.v-application a {
    color: #FFFFFF90 !important;
}
.container {
    height: inherit !important;
}
</style>