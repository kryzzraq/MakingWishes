<template>
  <v-container class="py-12 py-md-16">
    <div class="mt-10 d-flex flex-column align-center">
      <v-snackbar
        v-if="chngPassword"
        v-model="chngPassword"
        :timeout="3000"
        color="secondaryMedium"
        dark
        top
        transition="fade-transition"
      >
        Contraseña cambiada correctamente
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="chngPassword = false"
          >
            Ok
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-if="chngAvatar"
        v-model="chngAvatar"
        :timeout="2000"
        color="secondaryMedium"
        dark
        top
        transition="fade-transition"
      >
        Por favor, selecciona un archivo.
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="chngAvatar = false">
            Ok
          </v-btn>
        </template>
      </v-snackbar>

      <h3 class="text-center">Configuración de la cuenta</h3>
      <div class="py-2">Aquí podrás cambiar tu contraseña y avatar</div>
      <v-card
        color="secondaryLight"
        width="50%"
        min-width="300px"
        elevation="10"
        class="my-6 pt-4"
      >
        <v-card-text>
          <div>
            <div class="err ml-1">
              <div
                v-if="
                  $v.newDataUser.password.password.$dirty &&
                  !$v.newDataUser.password.password.required
                "
              >
                Este campo es requerido.
              </div>
              <div
                v-if="
                  $v.newDataUser.password.password.$dirty &&
                  !$v.newDataUser.password.password.minLength
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
              v-model.trim="$v.newDataUser.password.password.$model"
              @click:append="show = !show"
              required
            ></v-text-field>
          </div>
          <div>
            <div class="errAA ml-1">
              <div
                v-if="
                  $v.newDataUser.password.confirm.$dirty &&
                  !$v.newDataUser.password.confirm.sameAsPassword
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
              v-model.trim="$v.newDataUser.password.confirm.$model"
              required
            ></v-text-field>
          </div>
          <v-btn
            block
            color="primary"
            :disabled="$v.$invalid"
            @click="changePassword"
            >Cambiar contraseña</v-btn
          >
        </v-card-text>
      </v-card>
      <v-card
        color="secondaryLight"
        width="50%"
        min-width="300px"
        elevation="10"
        class="my-6 pt-4"
      >
        <v-card-text>
          <div>
            <v-file-input
              prepend-icon="mdi-camera"
              solo
              dense
              id="avatar"
              accept="image/png, image/jpeg"
              placeholder="Selecciona una foto"
            ></v-file-input>
          </div>
          <v-btn block color="primary" @click="changeAvatar"
            >Cambiar avatar</v-btn
          >
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "vuelidate/lib/validators";

import axios from "axios";

export default {
  name: "Config",
  computed: {
    ...mapState(["user"]),
  },
  validations: {
    newDataUser: {
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
  data() {
    return {
      show: false,
      show1: false,
      chngPassword: false,
      chngAvatar: false,
      newDataUser: {
        avatar: [],
        password: {
          password: "",
          confirm: "",
        },
      },
    };
  },
  methods: {
    async changePassword() {
      //encriptamos la contraseña antes de mandarla a servidor
      if (
        this.newDataUser.password.password === this.newDataUser.password.confirm
      ) {
        let encryptedPassword = this.CryptoJS.SHA256(
          this.newDataUser.password.password
        );
        let newPass = encryptedPassword.toString(this.CryptoJS.enc.Base64);
        let response = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/changePassword",
          {
            password: newPass,
          }
        );

        if (response.data.text) {
          this.chngPassword = true;
          this.newDataUser.password.password = "";
          this.newDataUser.password.confirm = "";
        }
      }
    },
    async changeAvatar() {
      let fd = new FormData();
      let files = document.getElementById("avatar").files[0];
      if (files) {
        fd.append("image", files);
        await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/changeAvatar",
          fd
        );
        window.location.reload();
      } else {
        this.chngAvatar = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h3,
h4 {
  letter-spacing: 0.26rem;
  font-weight: 400;
  text-transform: uppercase;
}
.err {
  color: white;
}
</style>