import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
   
});

export default new Vuetify({
     theme: {
        themes: {
          light: {
            primary: '#F50057',
            primaryLight: '#F08080'
          },
          dark:{
              warning: '#e23452'
          }
        }
      }
});
