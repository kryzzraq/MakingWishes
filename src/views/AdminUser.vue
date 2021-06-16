<template>
    <v-container class="mt-8 d-flex justify-center">
        <v-container class="mt-xs-8 mt-md-8 d-flex justify-sm-space-around" :key="forceUpdate">
            <v-snackbar
                v-if="chngPss"
                v-model="chngPss"
                :timeout="3000"
                color="secondaryMedium"
                dark
                top
                transition="fade-transition"
            >
                Contraseña cambiada.
                <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="chngPss = false"
                >
                    Ok
                </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar
                v-if="fatalData"
                v-model="fatalData"
                :timeout="3000"
                color="secondaryMedium"
                dark
                top
                transition="fade-transition"
            >
                La contraseña debe tener al menos 8 caracteres y deben de ser iguales.
                <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="fatalData = false"
                >
                    Ok
                </v-btn>
                </template>
            </v-snackbar>
            <v-dialog
                v-model="changePass"
                persistent
                max-width="600px"
                >
                <v-card>
                    <v-card-title class="title">
                        <h3 class="mt-8 white--text ">Cambiar contraseña:</h3>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                        >
                        <div class="err ml-1" >
                            <div v-if="$v.password.password.$dirty && !$v.password.password.required">Este campo es requerido.</div>
                            <div v-if="$v.password.password.$dirty && !$v.password.password.minLength">Mínimo 8 caracteres.</div>
                        </div>
                            <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            placeholder="Introduzca una contraseña"
                            hint="Contraseña"
                            v-model.trim="$v.password.password.$model"
                            @click:append="show = !show"
                            required
                            ></v-text-field>
                       </v-col>

                        <v-col cols="12">
                            <div class="err ml-1" >
                                <div v-if="$v.password.confirm.$dirty && !$v.password.confirm.sameAsPassword">Las contraseñas no coinciden.</div>
                            </div>
                            <v-text-field
                            class="red--text"
                            placeholder="Confirma la contraseña"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            hint="Confirma la contraseña"
                            @click:append="show1 = !show1"
                            v-model.trim="$v.password.confirm.$model"
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
                        @click="changePassword"
                    >
                        Cambiar
                    </v-btn>
                    <v-btn
                        color="secondary"
                        text
                        @click="changePass = false"
                    >
                        Cerrar
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
           <v-card
                class="mx-auto pb-10"
                min-width="325"
                    width="80%"
            >
                <div>
                    <v-img
                    class="white--text align-end"
                    height="300px"
                    :src="img_path+contact.route_image"
                    >
                    </v-img>

                    <v-card-title class="pb-0">
                        <h3>{{contact.name}} {{contact.last_name_1}} {{contact.last_name_2}} </h3>                    
                    </v-card-title>

                    <v-card-text class="text--primary pb-1">
                     <div class="h5">{{contact.email}}</div>
                    </v-card-text>
                </div>
                <div v-if="Object.keys(this.wishes).length == 0">
                   <div class="mt-2 pl-6 text-body-2">Este contacto aún no ha añadido ningún deseo.</div>
                </div>
                <div v-else>
                    <h4 class="mt-2 ml-6">Disponibles:</h4>
                    <div class="px-8" v-for="wish in wishes" :key="wish.id_item"> 
                            <div v-if="wish.available === 'yes'">
                                <v-row  >
                                    <v-col class="pb-0" cols="9">
                                        <h4 class="py-1 pb-0">{{wish.name}}</h4>
                                    </v-col>
                                </v-row> 
                                <v-row class="pl-4 pt-0">
                                    <v-col class="pa-0 ma-0 h5">{{wish.description}}</v-col>    
                                </v-row> 
                                <v-row class="pl-4">
                                    <v-col  class="pa-0 ma-0 "><a @click="redirect(wish.link)" class="caption">{{wish.link}}</a>  </v-col>
                                </v-row>    
                            </div>
                    </div>
                    <h4 class="mt-4 ml-6">No disponibles:</h4>
                    <div class="px-8" v-for="wish in wishes" v-bind:key="wish.link"> 
                        <div v-if="wish.available === 'no'">
                            <v-row >
                                <v-col class="pb-0" cols="6">
                                    <h5 class="py-1">{{wish.name}}</h5>
                                </v-col>
                            </v-row> 
                            <v-row class="pl-4">
                                <v-col class="pa-0 ma-0"> <div class="h5">{{wish.description}}</div> </v-col>    
                            </v-row>   
                        </div>
                    </div>
                    <h4 class="mt-4 ml-6">Acciones:</h4>
                    <div class="px-8" v-for="wish in wishes" v-bind:key="wish.name"> 
                        <div v-if="wish.available === 'no'">
                            <v-row >
                                <v-col class="pb-0 pt-5 d-flex justify-space-around" cols="12">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            class="mx-2 delete"
                                            fab
                                            dark                
                                            color="primary"
                                            @click="changePass = true"
                                            >
                                                <v-icon color="white">
                                                    mdi-form-textbox-password
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Cambiar contraseña</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            class="mx-2 delete"
                                            fab
                                            dark                
                                            color="primary"
                                            @click="adminUser"
                                            >
                                                <v-icon color="white">
                                                    mdi-account-tie
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Hacer administrador</span>
                                    </v-tooltip>
                                    
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            class="mx-2 delete"
                                            fab
                                            dark                
                                            color="primary"
                                            @click="deleteUser"
                                            >
                                                <v-icon color="white">
                                                    mdi-trash-can-outline
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Eliminar usuario</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row> 
                        </div>
                    </div>
                </div>                    
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios'
import { required, sameAs, minLength} from "vuelidate/lib/validators";
import {mapState} from 'vuex'

export default {
    name: "AdminUser",
    data(){
        return{
            contact:{

            },
            wishes:[

            ],
            img_path:process.env.VUE_APP_SERVER_IMG_PATH,
            forceUpdate:0,
            changePass: false,
            show: false,
            show1:false,
            password: {
                password: '',
                confirm: '',
            },
            chngPss: false,
            fatalData: false
        }
    },
    methods: {
        async deleteUser(){
            await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/deleteUser", {
                "id_user": this.$router.history.current.params.id
            })
            this.$router.push("/home/admin/users")
        },
        async adminUser(){
            await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/adminUser", {
                "id_user": this.$router.history.current.params.id
            })
            this.$router.push("/home/admin/users")
        },
        async changePassword(){
            if(this.$v.$invalid){
               this.changePass = false
                this.fatalData = true
                this.password.password = ''
                this.password.confirm = ''
            } else {
                if(this.password.password === this.password.confirm){
                    let encryptedPassword1 = this.CryptoJS.SHA256(this.password.password)    
                    let newPass1 = encryptedPassword1.toString(this.CryptoJS.enc.Base64)
    
                    let encryptedPassword2 = this.CryptoJS.SHA256(this.password.confirm)    
                    let newPass2 = encryptedPassword2.toString(this.CryptoJS.enc.Base64)
    
                    console.log(newPass1);
                    console.log(newPass2);
    
                    let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/changePassAdmin", {
                        "id_user": this.$router.history.current.params.id,
                        "pass1": newPass1,
                        "pass2":newPass2
                    })
    
                    if(response.data.text) {
                        this.changePass = false
                        this.chngPss = true
                        this.password.password = ''
                        this.password.confirm = ''
                    }
                }
            }



        }
    },
    async beforeMount() {

        if(this.user.rol !== 'admin'){
             this.$router.push("/home/unauthorized")
        }

        let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadContact", {
            "id_contact": this.$router.history.current.params.id
        })
        if (response.data[0]) {
            this.contact = response.data[0]
        }
         let responseWishes = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadContactWishes", {
            "id_contact": this.$router.history.current.params.id
        })
        if (responseWishes.data[0]) {
            this.wishes = responseWishes.data
        }
    },
    computed:{
       ...mapState(['user'])
    },
    validations: {
      password: {
        password: {
          required,
          minLength: minLength(8)
        },
        confirm: {
          sameAsPassword: sameAs('password')
        }
      }
    }
}
</script>

<style scoped>
h2, h3,h4, h5{
    letter-spacing: 0.1rem;
    font-weight: 400;
    text-transform: uppercase;
}
h4, h5 {
    letter-spacing: 1px;
}
.h5 {
    font-size: 15px;
    font-weight:300 !important
}
.title{
    background-color: #F50057;
    padding-bottom: 40px !important;
    font-weight: 500 !important;
}
</style>