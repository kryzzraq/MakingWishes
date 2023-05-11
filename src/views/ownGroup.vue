<template>
  <v-container class="mt-16 d-flex justify-center" :key="forceRender">
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
        <v-btn color="white" text v-bind="attrs" @click="wrongData = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
    <v-container class="mt-xs-8 mt-md-12 d-flex justify-sm-space-around">
      <v-card class="mx-auto pb-2" min-width="300">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="mx-2 delete"
              fab
              dark
              color="primary"
              @click="deleteGroup"
            >
              <v-icon color="white"> mdi-trash-can-outline </v-icon>
            </v-btn>
          </template>
          <span>Eliminar grupo</span>
        </v-tooltip>
        <div>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="img_path + actualGroup.route_image"
          >
          </v-img>

          <v-card-title class="pb-0">
            <h3>{{ actualGroup.name }}</h3>
          </v-card-title>

          <v-card-text class="text--primary">
            <div>{{ actualGroup.description }}</div>
          </v-card-text>
        </div>
        <div class="d-flex flex-column">
          <h3 class="mx-4">Deseos:</h3>

          <div class="px-8" v-for="wish in wishes" v-bind:key="wish.name">
            <div>
              <div class="d-flex mt-3">
                <div class="d-flex align-center name">
                  <h5>{{ wish.name }}</h5>
                </div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="deleteWish(wish.id_item)"
                    >
                      <v-icon color="red"> mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar deseo</span>
                </v-tooltip>
              </div>
              <div>
                <div class="h52 text-body-2">{{ wish.description }}</div>
              </div>
              <div class="link">
                <a @click="redirect(wish.link)" class="caption">{{
                  wish.link
                }}</a>
              </div>
            </div>
          </div>
          <v-dialog v-model="addWish" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mt-2 align-self-end"
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
                <h3 class="mt-8 white--text">Guardar deseo:</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <div class="err">
                        <div
                          v-if="
                            $v.new_wish.wish_name.$dirty &&
                            !$v.new_wish.wish_name.required
                          "
                        >
                          Este campo es requerido.
                        </div>
                      </div>
                      <v-text-field
                        v-model.trim="$v.new_wish.wish_name.$model"
                        elevation="4"
                        label="Nombre del deseo"
                        required
                      ></v-text-field>
                    </v-col>
                    <div class="err mt-4">
                      <div
                        v-if="
                          $v.new_wish.wish_description.$dirty &&
                          !$v.new_wish.wish_description.required
                        "
                      >
                        Este campo es requerido.
                      </div>
                      <div
                        v-if="
                          $v.new_wish.wish_description.$dirty &&
                          !$v.new_wish.wish_description.maxLength
                        "
                      >
                        Máximo 1000 caracteres.
                      </div>
                    </div>
                    <v-col cols="12">
                      <v-textarea
                        v-model.trim="$v.new_wish.wish_description.$model"
                        name="input-7-4"
                        label="Descripción del deseo"
                        height="100px"
                        hint="Máximo 1000 caracteres."
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <div class="err">
                        <div
                          v-if="
                            $v.new_wish.wish_link.$dirty &&
                            !$v.new_wish.wish_link.required
                          "
                        >
                          Este campo es requerido.
                        </div>
                        <div
                          v-if="
                            $v.new_wish.wish_link.$dirty &&
                            !$v.new_wish.wish_link.maxLength
                          "
                        >
                          Máximo 600 caracteres.
                        </div>
                      </div>
                      <v-text-field
                        v-model.trim="$v.new_wish.wish_link.$model"
                        label="Link"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="saveWish"> Guardar </v-btn>
                <v-btn color="secondary" text @click="addWish = false">
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex flex-column">
          <h3 class="mx-4">Miembros:</h3>
          <div class="px-8" v-for="member in members" v-bind:key="member.name">
            <v-row mt-6>
              <v-col cols="6" class="mt-2">
                <span class="h5 text-body-2"
                  >{{ member.name }} {{ member.last_name_1 }}
                  {{ member.last_name_2 }}</span
                >
              </v-col>
              <v-col class="pa-0 ma-0 mt-2" cols="6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="deleteUser(member.id_user)"
                    >
                      <v-icon color="red"> mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar miembro</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </div>
          <v-dialog v-model="addUser" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4 align-self-end"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                text
              >
                Añadir miembro
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="title">
                <h3 class="mt-8 white--text">Añadir contactos:</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <h4
                    class="text-center mt-4"
                    v-if="Object.keys(this.noMembers).length === 0"
                  >
                    No tienes más amigos a los que añadir al grupo
                  </h4>
                  <div
                    v-for="user in noMembers"
                    v-bind:key="user.id_user"
                    class="d-flex justify-space-between users"
                  >
                    <div class="text-button py-2 ml-16">
                      {{ user.name }} {{ user.last_name_1 }}
                      {{ user.last_name_2 }}
                    </div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-16"
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="addUserToGroup(user.id_user)"
                        >
                          <v-icon color="primary"
                            >mdi-account-plus-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Agregar miembro</span>
                    </v-tooltip>
                  </div>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="addUser = false">
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "OwnGroup",
  data() {
    return {
      actualGroup: {},
      members: [],
      noMembers: [],
      wishes: [],
      addWish: false,
      addContact: false,
      addUser: false,
      img_path: process.env.VUE_APP_SERVER_IMG_PATH,
      new_wish: {
        wish_name: "",
        wish_description: "",
        wish_link: "",
      },
      wrongData: false,
      forceRender: 0,
    };
  },
  async beforeMount() {
    let owner = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/checkOwnership",
      {
        id_group: this.$router.history.current.params.id,
      }
    );
    if (owner.data.error) {
      this.$router.push("/home/unauthorized");
    }

    let responseGroup = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadOwnGroup",
      {
        id_group: this.$router.history.current.params.id,
      }
    );

    if (responseGroup.data[0]) {
      this.actualGroup = responseGroup.data[0];
    }

    let responseWishes = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupWishes",
      {
        id_group: this.$router.history.current.params.id,
      }
    );

    if (responseWishes.data[0]) {
      this.wishes = responseWishes.data;
    }

    let responseMembers = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupUsers",
      {
        id_group: this.$router.history.current.params.id,
      }
    );

    if (responseMembers.data[0]) {
      this.members = responseMembers.data;
    }

    let responseNoMembers = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadnoMembers",
      {
        id_group: this.$router.history.current.params.id,
      }
    );

    if (responseNoMembers.data[0]) {
      this.noMembers = responseNoMembers.data;
    }
  },

  methods: {
    async deleteWish(id) {
      await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH + "/deleteWish", {
        id_item: id,
      });
      window.scrollTo(0, 0);
      let responseWishes = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupWishes",
        {
          id_group: this.$router.history.current.params.id,
        }
      );

      if (responseWishes.data) {
        this.wishes = responseWishes.data;
      }
      this.forceRender = +1;
    },
    async saveWish() {
      if (!this.$v.$invalid) {
        let response = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/createWishGroup",
          {
            wish_name: this.new_wish.wish_name,
            wish_description: this.new_wish.wish_description,
            wish_link: this.new_wish.wish_link,
            id_group: this.actualGroup.id_group,
          }
        );
        window.scrollTo(0, 0);
        let responseWishes = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupWishes",
          {
            id_group: this.$router.history.current.params.id,
          }
        );

        if (responseWishes.data) {
          this.wishes = responseWishes.data;
        }
        this.addWish = false;
        this.forceRender += 1;
        this.new_wish.wish_name = "";
        this.new_wish.wish_description = "";
        this.new_wish.wish_link = "";
      } else {
        this.wrongData = true;
      }
    },
    async deleteGroup() {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/deleteGroup",
        {
          id_group: this.actualGroup.id_group,
        }
      );
      this.$router.push("/home/groups");
    },
    redirect(url) {
      window.open("http://" + url, "_blank");
    },
    async addUserToGroup(id) {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/addUserGroup",
        {
          id_group: this.$router.history.current.params.id,
          id_user_member: id,
        }
      );
      let responseNotif = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/sendGroupNotif",
        {
          id_group: this.$router.history.current.params.id,
          id_user_member: id,
        }
      );
      if (response.data) {
        window.scrollTo(0, 0);
        let responseMembers = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupUsers",
          {
            id_group: this.$router.history.current.params.id,
          }
        );

        if (responseMembers.data) {
          this.members = responseMembers.data;
        }
        let responseNoMembers = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadnoMembers",
          {
            id_group: this.$router.history.current.params.id,
          }
        );

        if (responseNoMembers.data) {
          this.noMembers = responseNoMembers.data;
        }
        this.addUser = false;
        this.forceRender += 1;
      }
    },
    async deleteUser(id) {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/deleteUserGroup",
        {
          id_group: this.$router.history.current.params.id,
          id_user_member: id,
        }
      );
      if (response.data) {
        window.scrollTo(0, 0);
        let responseMembers = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadGroupUsers",
          {
            id_group: this.$router.history.current.params.id,
          }
        );

        if (responseMembers.data) {
          this.members = responseMembers.data;
        }
        let responseNoMembers = await axios.post(
          process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadnoMembers",
          {
            id_group: this.$router.history.current.params.id,
          }
        );

        if (responseNoMembers.data) {
          this.noMembers = responseNoMembers.data;
        }
        this.forceRender += 1;
      }
    },
  },
  validations: {
    new_wish: {
      wish_description: {
        required,
        maxLength: maxLength(1000),
      },
      wish_name: {
        required,
      },
      wish_link: {
        required,
        maxLength: maxLength(600),
      },
    },
  },
};
</script>


<style scoped>
h2,
h3 {
  letter-spacing: 0.1rem;
  font-weight: 400;
  text-transform: uppercase;
}
h4,
h5 {
  letter-spacing: 1px;
  font-weight: 400;
  text-transform: uppercase;
}
h5 {
  font-size: 0.9rem;
  margin-top: 5px;
}
.name {
  min-width: 50%;
}
.h5 {
  font-size: 15px;
  font-weight: 300 !important;
  text-transform: capitalize;
}
.h52 {
  font-size: 15px;
  font-weight: 300 !important;
}
.title {
  background-color: #f50057;
  padding-bottom: 40px !important;
  font-weight: 500 !important;
}
.err {
  color: rgb(255, 0, 0);
  font-size: 11px;
}
.users {
  width: 100%;
}
.link {
  line-height: initial;
}
.caption {
  line-height: 1;
}
.delete {
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 10px;
}
</style>