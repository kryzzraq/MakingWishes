<template>
    <v-container fill-height fluid class="pa-0">
    <div class="bluring"></div>
        <v-layout align-center justify-center class="form">
           <v-card height="auto" width="400"   color="rgba(255, 255, 255, 0.7)">
             <v-container fill-height>
               <v-layout align-center justify-center>
                 <v-card-text>
                   <router-link to="/">
                    <v-img
                        src="../assets/img/logo.png"
                        class="mx-auto mb-4"
                        alt="logotipo-making-wishes"
                        max-height="120px"
                        max-width="120px"
                      ></v-img>
                   </router-link> 
                   <span >Introduzca su correo electrónico:</span>
                   <div class="err" v-if="$v.user.email.$dirty && !$v.user.email.email">El email no es válido.</div> 
                  <v-text-field 
                    solo
                    dense
                    max-height="10"
                    color="white"
                    required
                    v-model.trim="$v.user.email.$model" 
                  ></v-text-field>
                  <span>Introduzca su contraseña:</span>
                  <div class="err" v-if="$v.user.password.$dirty && !$v.user.password.required">Este campo es requerido.</div>
                   <v-text-field
                   solo
                   dense
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    hint="Al menos 8 caracteres"
                    @click:append="show = !show"
                    v-model.trim="$v.user.password.$model"
                    required
                  ></v-text-field>
                  
                  <v-btn block small color="primary">Entrar</v-btn>
                 <div class="text-center pa-2"><a class="black--text ">¿Has olvidado tu contraseña?</a></div>
                 </v-card-text>
               </v-layout>
             </v-container>
           </v-card>
         </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: 'Login',
  components: {
    
  }, 
  data () {
    return {
      show: false,
       user: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
  },
  validations: {
    user: {
      email: {
         required,
         email
       },
       password: {
         required,
         minLength: minLength(8)
       }
    }
  }
}
</script>
<style>
  .bluring {
    background-image: url("../assets/img/present-bg.jpg");
    filter: blur(10px);
    height: 100vh;
    width: 100%;
    background-position: left;
    transform: scale(1.2); 
  }
  .form {
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .err {
    color: #f50057;
    font-size: 11px;
  }
</style>