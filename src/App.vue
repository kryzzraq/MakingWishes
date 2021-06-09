<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  async beforeUpdate() {
    window.scrollTo(0,0)
  },
  async updated() {
    if (localStorage.token) {
      let responseUser = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/renewcredentials");
      this.actLogin(responseUser.data) 

      let responseWishes = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadUserWishes");
      this.actLoadWishes(responseWishes.data);

      let responseOwnGroups = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadOwnGroups");
      this.actLoadOwnGroups(responseOwnGroups.data);

      let responseGroups = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadGroups");
      this.actLoadGroups(responseGroups.data);

      let responseContacts = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadContacts");
      this.actLoadContacts(responseContacts.data);
      
    }
  },
  methods: {
    ...mapActions([
      'actLogin', 'actLoadWishes','actLoadOwnGroups', 'actLoadGroups', 'actLoadContacts'
    ])
  }
};
</script>
