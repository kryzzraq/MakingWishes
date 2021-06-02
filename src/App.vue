<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import axios from 'axios'
import {mapActions} from 'vuex'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
  async beforeMount(){
    if (localStorage.token) {
      let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+'/renewcredentials', localStorage.token);
      console.log(response);
        this.actLogin(response.data) 
    }
  },
  methods: {
    ...mapActions([
      'actLogin'
    ])
  }
};
</script>
