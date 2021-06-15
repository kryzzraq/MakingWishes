import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
   
});

export default new Vuetify({
     theme: {
        themes: {
          //colores usados en la app
          light: {
            primary: '#F50057',
            primaryLight: '#F08080',
            secondaryMedium: '#616161',
            secondaryLight: '#808080'
          }
        }
      }
});
