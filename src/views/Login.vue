<template>
  <v-container fill-height fluid class="pa-0">
    <div class="bluring"></div>
    <v-layout align-center justify-center class="form">
      <v-card height="auto" width="400" color="rgba(255, 255, 255, 0.7)">
        <v-container fill-height>
          <v-snackbar
            v-if="wrongCredentials"
            v-model="wrongCredentials"
            :timeout="5000"
            light
            top
            transition="fade-transition"
          >
            Credenciales erróneos.

            <template v-slot:action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="wrongCredentials = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
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
              <span>Introduzca su correo electrónico:</span>
              <div
                class="err"
                v-if="$v.user.email.$dirty && !$v.user.email.email"
              >
                El email no es válido.
              </div>
              <v-text-field
                solo
                dense
                max-height="10"
                color="white"
                required
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <span>Introduzca su contraseña:</span>
              <div
                class="err"
                v-if="$v.user.password.$dirty && !$v.user.password.required"
              >
                Este campo es requerido.
              </div>
              <v-text-field
                solo
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                hint="Al menos 8 caracteres"
                @click:append="showPassword = !showPassword"
                @keypress.enter="login(user.email, user.password)"
                v-model.trim="$v.user.password.$model"
                required
              ></v-text-field>

              <v-btn
                block
                small
                color="primary"
                :disabled="$v.$invalid"
                @click="login(user.email, user.password)"
                >Entrar</v-btn
              >
            </v-card-text>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";
import axios from "axios";
import { mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      showPassword: false,
      user: {
        email: "",
        password: "",
      },
      wrongCredentials: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["actLogin"]),
    async login(email, password) {
      let encryptedPassword = this.CryptoJS.SHA256(password);
      let newPass = encryptedPassword.toString(this.CryptoJS.enc.Base64);
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/login",
        {
          email: email,
          passwd: newPass,
        }
      );
      if (response.data.email) {
        this.actLogin(response.data);
        localStorage.setItem("token", response.data.token);
        this.$router.push("home");
      } else {
        this.user.email = "";
        this.user.password = "";
        this.wrongCredentials = true;
      }
    },
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
};
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
  transform: translate(-50%, -50%);
}
.err {
  color: #f50057;
  font-size: 11px;
}
</style>