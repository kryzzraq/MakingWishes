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
                <div class="err ml-1">
                  <div v-if="$v.user.name.$dirty && !$v.user.name.required">
                    Este campo es requerido.
                  </div>
                  <div v-if="$v.user.name.$dirty && !$v.user.name.regexName">
                    Este campo sólo admite caracteres alfabéticos.
                  </div>
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
                <div class="err ml-1">
                  <div
                    v-if="
                      $v.user.lastName1.$dirty && !$v.user.lastName1.required
                    "
                  >
                    Este campo es requerido.
                  </div>
                  <div
                    v-if="
                      $v.user.lastName1.$dirty &&
                      !$v.user.lastName1.regexLastName
                    "
                  >
                    Este campo sólo admite caracteres alfabéticos.
                  </div>
                </div>
                <v-text-field
                  placeholder="Primer apellido"
                  hint="Primer apellido"
                  solo
                  dense
                  v-model.trim="$v.user.lastName1.$model"
                ></v-text-field>
                <div class="err ml-1">
                  <div
                    v-if="
                      $v.user.lastName2.$dirty && !$v.user.lastName2.required
                    "
                  >
                    Este campo es requerido.
                  </div>
                  <div
                    v-if="
                      $v.user.lastName2.$dirty &&
                      !$v.user.lastName2.regexLastName
                    "
                  >
                    Este campo sólo admite caracteres alfabéticos.
                  </div>
                </div>
                <v-text-field
                  placeholder="Segundo apellido"
                  hint="Segundo apellido"
                  solo
                  dense
                  v-model.trim="$v.user.lastName2.$model"
                ></v-text-field>
              </div>
              <div>
                <div class="err ml-1">
                  <div v-if="$v.user.email.$dirty && !$v.user.email.required">
                    Este campo es requerido.
                  </div>
                  <div v-if="$v.user.email.$dirty && !$v.user.email.email">
                    El email no es válido.
                  </div>
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
                <div class="err ml-1">
                  <div
                    v-if="
                      $v.user.password.password.$dirty &&
                      !$v.user.password.password.required
                    "
                  >
                    Este campo es requerido.
                  </div>
                  <div
                    v-if="
                      $v.user.password.password.$dirty &&
                      !$v.user.password.password.minLength
                    "
                  >
                    Mínimo 8 caracteres.
                  </div>
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
                <div class="err ml-1">
                  <div
                    v-if="
                      $v.user.password.confirm.$dirty &&
                      !$v.user.password.confirm.sameAsPassword
                    "
                  >
                    Las contraseñas no coinciden.
                  </div>
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
              <div>
                <v-file-input
                  prepend-icon="mdi-camera"
                  solo
                  dense
                  id="avatar"
                  v-model.trim="user.avatar"
                  accept="image/png, image/jpeg"
                  placeholder="Selecciona una foto (Opcional)"
                ></v-file-input>
              </div>
              <v-btn
                block
                color="primary"
                @click="submitForm"
                :disabled="$v.$invalid"
                >Registrarse</v-btn
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
import axios from "axios";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "vuelidate/lib/validators";
const regexName = helpers.regex(
  "regexName",
  /(^[a-záéíóúñ]+)([a-z áéíóúñ]+)?$/i
);
const regexLastName = helpers.regex("regexLastName", /(^[a-záéíóúñ]+)?$/i);

export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      show: false,
      show1: false,
      user: {
        avatar: [],
        name: "",
        lastName1: "",
        lastName2: "",
        email: "",
        password: {
          password: "",
          confirm: "",
        },
      },
    };
  },
  methods: {
    async submitForm(e) {
      let fd = new FormData();
      let files = document.getElementById("avatar").files[0];

      let encryptedPassword = this.CryptoJS.SHA256(this.user.password.password);
      let newPass = encryptedPassword.toString(this.CryptoJS.enc.Base64);

      let encryptedPassword1 = this.CryptoJS.SHA256(this.user.password.confirm);
      let newPass1 = encryptedPassword1.toString(this.CryptoJS.enc.Base64);

      fd.append("image", files);
      fd.append("name", this.user.name);
      fd.append("last_name_1", this.user.lastName1);
      fd.append("last_name_2", this.user.lastName2);
      fd.append("email", this.user.email);
      fd.append("password1", newPass);
      fd.append("password2", newPass1);

      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/signin",
        fd
      );

      if (response.data.text) {
        this.$router.push("/");
      }
    },
  },
  validations: {
    user: {
      name: {
        required,
        regexName,
      },
      lastName1: {
        required,
        regexLastName,
      },
      lastName2: {
        required,
        regexLastName,
      },
      email: {
        required,
        email,
      },
      password: {
        password: {
          required,
          minLength: minLength(8),
        },
        confirm: {
          sameAsPassword: sameAs("password"),
        },
      },
    },
  },
  mounted() {},
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