<template>
  <v-container fluid class="pa-0">
    <div class="bluring"></div>
    <v-layout align-center justify-center class="form">
      <v-card height="auto" width="400" color="rgba(255, 255, 255, 0.7)">
        <v-container fill-height class="pa-4">
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
              <div>
                <div class="err ml-1" >
                  <div v-if="$v.user.name.$dirty && !$v.user.name.required">Este campo es requerido.</div>
                  <div v-if="$v.user.name.$dirty && !$v.user.name.alpha">Este campo sólo admite caracteres alfabéticos.</div>
                </div>
                <v-text-field
                  placeholder="Nombre"
                  hint="Nombre"
                  solo
                  autofocus
                  dense
                  v-model.trim="$v.user.name.$model"
                ></v-text-field>
              </div>
              <div>
                <div class="err ml-1" >
                  <div v-if="$v.user.lastName.$dirty && !$v.user.lastName.required">Este campo es requerido.</div>
                  <div v-if="$v.user.lastName.$dirty && !$v.user.lastName.alpha">Este campo sólo admite caracteres alfabéticos.</div>
                </div>
                <v-text-field
                  placeholder="Apellidos"
                  hint="Apellidos"
                  solo
                  dense
                  v-model.trim="$v.user.lastName.$model"
                ></v-text-field>

              </div>
              <div>
                <div class="err ml-1" >
                  <div v-if="$v.user.email.$dirty && !$v.user.email.required">Este campo es requerido.</div>
                  <div v-if="$v.user.email.$dirty && !$v.user.email.email">El email no es válido.</div>
                </div>
                <v-text-field
                  placeholder="Correo electrónico"
                  hint="Correo electrónico"
                  solo
                  dense
                  v-model.trim="$v.user.email.$model"
                ></v-text-field>
              </div>
              <div>
                <div class="err ml-1" >
                  <div v-if="$v.user.password.password.$dirty && !$v.user.password.password.required">Este campo es requerido.</div>
                  <div v-if="$v.user.password.password.$dirty && !$v.user.password.password.minLength">Mínimo 8 caracteres.</div>
                </div>
                <v-text-field
                  solo
                  dense
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  placeholder="Introduzca una contraseña"
                  hint="Contraseña"
                  v-model.trim="$v.user.password.password.$model"
                  @click:append="show = !show"
                  required
                ></v-text-field>
              </div>
               <div>
                <div class="err ml-1" >
                  <div v-if="$v.user.password.confirm.$dirty && !$v.user.password.confirm.sameAsPassword">Las contraseñas no coinciden.</div>
                </div>
                <v-text-field
                  solo
                  dense
                  class="red--text"
                  placeholder="Confirma la contraseña"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  hint="Confirma la contraseña"
                  @click:append="show1 = !show1"
                  v-model.trim="$v.user.password.confirm.$model"
                  required
                ></v-text-field>
              </div>
              <v-btn block  color="primary" @click.prevent="submitForm" :disabled="$v.$invalid"
                >Registrarse</v-btn>
            </v-card-text>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { required, alpha, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      show: false,
      show1: false,
      user: {
        name: '',
        lastName: '',
        email: '',
        password: {
          password: '',
          confirm: '',
        },
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.$v)
      alert("sending form")
    },
  },
  validations: {
    user: {
      name: {
        required,
        alpha
      }, 
      lastName: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
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
  },
};
</script>
<style>
.bluring {
  background-image: url("../assets/img/present-bg.jpg");
  filter: blur(10px);
  height: 100vh;
  background-position: left;
  transform: scale(1.2);
  background-attachment: fixed;
}
.form {
  position: absolute;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container {
  overflow: hidden;
}
.err {
  color: #f50057;
  font-size: 11px;
}
</style>