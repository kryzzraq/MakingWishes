<template>
  <v-container class="mt-16 d-flex justify-center">
    <v-container
      class="mt-xs-8 mt-md-8 d-flex justify-sm-space-around"
      :key="forceUpdate"
    >
      <div v-if="Object.keys(actualSearchUsers).length != 0">
        <h4 class="mb-4 text-center">
          Estos son los contactos que hemos contrado
        </h4>
        <div class="d-flex flex-wrap justify-center">
          <v-card
            v-for="user in actualSearchUsers"
            v-bind:key="user.name"
            class="ma-2"
            max-width="300"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <span class="text-name">
                  {{ user.name }} {{ user.last_name_1 }} {{ user.last_name_2 }}
                </span>
                <v-list-item-subtitle class="text-subtitle-2">{{
                  user.email
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <img
                  class="profile-avatar"
                  :src="img_path + user.route_image"
                  alt="avatar"
              /></v-list-item-avatar>
            </v-list-item>

            <v-card-actions class="pt-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="addUser(user.id_user)"
                  >
                    <v-icon> mdi-account-plus-outline</v-icon>
                  </v-btn>
                </template>
                <span>Agregar usuario</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <div v-else class="ma-auto d-flex flex-column justify-center">
        <h2 class="text-center">Sin resultados</h2>
        <v-icon class="ma-auto icon-sad">mdi-emoticon-sad-outline</v-icon>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "SearchContacts",
  data() {
    return {
      actualSearchUsers: [],
      img_path: process.env.VUE_APP_SERVER_IMG_PATH,
      user: {},
      forceUpdate: 0,
    };
  },
  computed: {
    ...mapState(["actualSearch"]),
  },
  methods: {
    async addUser(id) {
      let response = await axios.post(
        process.env.VUE_APP_SERVER_TOTAL_PATH + "/sendFriendship",
        {
          id_user_notif: id,
          my_id: this.$store.state.user.id_user,
        }
      );
      this.forceUpdate += 1;
    },
  },
  async beforeMount() {
    let response = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadAllContacts",
      {
        search: this.$store.state.actualSearch,
      }
    );
    if (response.data[0]) {
      this.actualSearchUsers = response.data;
    }

    let response2 = await axios.post(
      process.env.VUE_APP_SERVER_TOTAL_PATH + "/loadAllContacts",
      {
        search: this.$store.state.actualSearch,
      }
    );
    if (response2.data) {
      this.actualSearchUsers = response2.data;
    }
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
.h5 {
  font-size: 15px;
  font-weight: 300 !important;
  text-transform: lowercase;
}
.text-name {
  text-transform: uppercase !important;
}
.icon-sad {
  font-size: 200px !important;
  padding-top: 20px;
  font-weight: 100;
  color: rgb(225, 225, 225) !important;
}
</style>