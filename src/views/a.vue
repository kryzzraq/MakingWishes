<template>
  <div>
    <v-app-bar
      app
      color="primary"
      height="70"
      class="hidden-md-and-down" 
    >
      <v-img
        src="../assets/img/logo_sin_texto.png"
        alt="logotipo-making-wishes"
        max-height="55px"
        max-width="55px" class="mr-5"
      ></v-img>
      <v-img
        src="../assets/img/logo_letras.png"
        alt="logotipo-making-wishes"
        class="mr-5"
        max-height="40px"
        max-width="150px"
      ></v-img>
        <v-container style="width:100%" fluid class=" d-flex align-center  ">
          <div v-for="item in menu" v-bind:key="item.index">
            <v-btn class="mx-3" color="primary" depressed><span class="">{{item.index}}</span></v-btn>
          </div>
          <v-spacer></v-spacer>
          <div >
            <v-text-field
              rounded solo
              dense 
              hide-details="false"
              class="mr-6"
              :append-icon="'mdi-magnify' "
              placeholder="Buscar personas"
              required
            ></v-text-field>
          </div>
          <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                x-large
                v-on="on"
                depressed
                primary
                class="pa-0"
                min-width="auto"
                exact-active-class
              >
                <v-avatar
                  color="secondary"
                >
                  <img
                    src="../assets/img/user-icon.jpg"
                    alt="John"
                  >
                </v-avatar>
              <v-icon size="30px" class="grey--text text--darken-3 mb-0"
                >mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar
                    color="secondary"
                    class="mb-3"
                  >
                    <span class="white--text">{{ user.initials }}</span>
                  </v-avatar>
                  <h3>{{ user.fullName }}</h3>
                  <p class="caption mt-1">
                    {{ user.email }}
                  </p>
                  <div v-for="item in submenu" v-bind:key="item.index">
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    depressed
                    rounded
                    text
                  >
                    {{item.index}}
                  </v-btn>
                  </div>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    depressed
                    rounded
                    text
                    color="primary"
                  >
                    Cerrar sesión
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-container>
    </v-app-bar>
    <div class="hidden-lg-and-up">
      <v-card
        class="mx-auto overflow-hidden"
        height="100vh"
      >
      <v-app-bar
        app
        color="primary"
        tile
        dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Making Wishes</v-toolbar-title>
      </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="pa-2"
    >
      <v-list
        nav
        dense
        flat
      >
        <v-list-item-title class="title"> Making Wishes </v-list-item-title>
        <v-list-item-group
          v-for="(item) in menu" v-bind:key="item.index"
        >
          <v-list-item>
            <v-icon size="20px" class="pa-3 grey--text text--darken-3">mdi-{{item.icon}}</v-icon>
            <v-list-item-title>{{item.index}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        
        <v-list-item-group
         
          v-for="(item) in submenu" :key="item.index"
        >
          <v-list-item>
            <v-icon size="20px" class="pa-3 grey--text text--darken-3">mdi-{{item.icon}}</v-icon>
            <v-list-item-title>{{item.index}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-text-field
              rounded outlined
              dense
              hide-details="false"
              :append-icon="'mdi-magnify' "
              placeholder="Buscar personas"
              required
            ></v-text-field>
      </v-list>
    </v-navigation-drawer>
  </v-card>
      </div>
        </div>
</template>

<script>

    export default {
        data() {
            return {
              menu:[
                {
                  index: "Inicio",
                  icon: "reorder-horizontal"
                },
                {
                  index: "Mis deseos",
                  icon: "thought-bubble-outline"
                },
                {
                  index: "Mis grupos",
                  icon: "account-group-outline"
                },
                {
                  index: "Mis contactos",
                  icon: "account-box-outline"
                }
              ],
              submenu:[
                {
                  index: "Configuración de la cuenta",
                  icon: "cog-outline"
                },
                {
                  index: "Notificaciones",
                  icon: "bell-outline"
                },
                {
                  index: "Crear grupo",
                  icon: "account-multiple-plus-outline"
                }
              ],
              drawer: false,
              user: {
                initials: 'LMV',
                fullName: 'Laura Martín Vicente',
                email: 'lauramartinv394@gmail.com',
              }
            }
        }
    }
</script>
<style>
    .err{
        color:red;
    }
</style>