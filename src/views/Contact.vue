<template>
  <v-container class="mt-16 d-flex justify-center">
    <v-container
      class="mt-xs-8 mt-md-8 d-flex justify-sm-space-around"
      :key="forceUpdate"
    >
      <v-card class="mx-auto pb-10" min-width="325" width="50%">
        <div>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="img_path + contact.route_image"
          >
          </v-img>

          <v-card-title class="pb-0">
            <h3>
              {{ contact.name }} {{ contact.last_name_1 }}
              {{ contact.last_name_2 }}
            </h3>
          </v-card-title>

          <v-card-text class="text--primary pb-1">
            <div class="h5">{{ contact.email }}</div>
          </v-card-text>
        </div>
        <div v-if="Object.keys(this.wishes).length == 0">
          <div class="mt-2 pl-6 text-body-2">
            Este contacto aún no ha añadido ningún deseo.
          </div>
        </div>
        <div v-else>
          <h4 class="mt-2 ml-6">Disponibles:</h4>
          <div class="px-8" v-for="wish in wishes" v-bind:key="wish.name">
            <div v-if="wish.available === 'yes'">
              <v-row>
                <v-col class="pb-0" cols="9">
                  <h4 class="py-1 pb-0">{{ wish.name }}</h4>
                </v-col>
                <v-col class="pa-0 ma-0" cols="2">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        class="mt-2"
                        icon
                        color="primary"
                        @click="selectWish(wish.id_item)"
                        ><v-icon>mdi-gift-open-outline</v-icon></v-btn
                      >
                    </template>
                    <span>Pedirse deseo</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row class="pl-4 pt-0">
                <v-col class="pa-0 ma-0 h5">{{ wish.description }}</v-col>
              </v-row>
              <v-row class="pl-4">
                <v-col class="pa-0 ma-0"
                  ><a @click="redirect(wish.link)" class="caption">{{
                    wish.link
                  }}</a>
                </v-col>
              </v-row>
            </div>
          </div>
          <h4 class="mt-4 ml-6">No disponibles:</h4>
          <div class="px-8" v-for="wish in wishes" v-bind:key="wish.link">
            <div v-if="wish.available === 'no'">
              <v-row>
                <v-col class="pb-0" cols="6">
                  <h5 class="py-1">{{ wish.name }}</h5>
                </v-col>
              </v-row>
              <v-row class="pl-4">
                <v-col class="pa-0 ma-0">
                  <div class="h5">{{ wish.description }}</div>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Contact",
  data() {
    return {
      contact: {},
      wishes: [],
      img_path: process.env.VUE_APP_SERVER_IMG_PATH,
      forceUpdate: 0,
    };
  },
  methods: {
    async selectWish(id) {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/selectWish",
        {
          id_item: id,
        }
      );
      let responseWishes = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadContactWishes",
        {
          id_contact: this.$router.history.current.params.id,
        }
      );
      this.wishes = responseWishes.data;
      this.forceUpdate += 1;
    },
  },
  async beforeMount() {
    let checkFriend = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/checkFriendship",
      {
        id_user: this.$router.history.current.params.id,
      }
    );
    if (checkFriend.data.text) {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadContact",
        {
          id_contact: this.$router.history.current.params.id,
        }
      );
      if (response.data[0]) {
        this.contact = response.data[0];
      }
      let responseWishes = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadContactWishes",
        {
          id_contact: this.$router.history.current.params.id,
        }
      );
      if (responseWishes.data[0]) {
        this.wishes = responseWishes.data;
      }
    } else {
      this.$router.push("/home/unauthorized");
    }
  },
  computed: {},
};
</script>

<style scoped>
h2,
h3,
h4,
h5 {
  letter-spacing: 0.1rem;
  font-weight: 400;
  text-transform: uppercase;
}
h4,
h5 {
  letter-spacing: 1px;
}
.h5 {
  font-size: 15px;
  font-weight: 300 !important;
}
</style>