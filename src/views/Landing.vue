<template>
  <v-container fluid class="landingHome pa-0">
    <v-row>
      <v-col cols="12" offset="10">
        <v-btn
          large
          color="primary"
          class="ma-2 white--text"
          elevation="6"
          to="login"
        >
          Acceder a mi cuenta
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="ml-16" cols="sm-12">
        <v-sheet
          color="rgb(255, 255, 255, 0.7)"
          class="pa-8 rounded-circle"
          max-height="180px"
          max-width="180px"
        >
          <v-img
            src="../assets/img/logo.png"
            alt="logotipo-making-wishes"
            max-height="120px"
            max-width="120px"
          ></v-img>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-6"  offset="1">
        <v-sheet
          color="rgb(255,255,255,0.7)"
          class="pa-5 rounded-lg"
          max-width="55%"
          min-width="300px"
        >
          <div class="display-1 text-center mb-3">
            Organiza los regalos de tus eventos
          </div>
          <p class="text-justify body-1">
            Making Wishes es una aplicación que busca facilitar el hacer
            regalos a tus seres queridos. Podrás crear una lista de deseos o
            incluso un grupo para organizar los regalos en tus eventos más
            especiales.
          </p>
          <div class="text-center">
            <v-btn x-large color="primary"  class="white--text"  elevation="2"  to="signin" >
              Crear una cuenta
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-16">
      <v-col md="2">
        <v-sheet
          align="center"
          class="text-center"
          min-height="200px"
          max-width="200px"
          rounded="circle"
          min-width="200px"
          color="rgba(255,255,255,0.7)"
        >
          <v-icon size="110px" class="pa-3 grey--text text--darken-3"
            >mdi-gift-open-outline</v-icon
          >
          <div class="overline">Elige tus regalos</div>
        </v-sheet>
      </v-col>
      <v-col md="2">
        <v-card
          class="text-center"
          min-height="200px"
          max-width="200px"
          rounded="circle"
          min-width="200px"
          color="rgba(255,255,255,0.7)"
        >
          <v-icon size="120px" class="pa-2 ml-2 grey--text text--darken-3"
            >mdi-thought-bubble-outline</v-icon
          >
          <div class="overline">Acierta siempre</div>
        </v-card>
      </v-col>
      <v-col md="2">
        <v-card
          class="text-center"
          min-height="200px"
          max-width="200px"
          rounded="circle"
          min-width="200px"
          color="rgba(255,255,255,0.7)"
        >
          <v-icon size="120px" class="grey--text text--darken-3"
            >mdi-account-group-outline</v-icon
          >
          <div
            class="text-center overline"
            style="width: 180px; margin: auto"
          >
            Conecta con tus amigos
          </div>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Landing",
  components: {
    HelloWorld,
  },
  data() {
    return {
    }
  },
  mounted() {},
};
</script>

<style>
body,
html {
  margin: 0;
  height: 100%;
}
.landingHome{
  position: absolute;
  top:0;
  background-image: url("../assets/img/present-bg.jpg");
  height: 100%;
  background-position: left;
}
.container {
  height: 100%;
}
.v-application{
  height: 100%;
  min-height: 100%;
}
</style>