<template>
  <div class="app">
    <div class="hidden-md-and-down" >
      <v-app-bar
        app
        color="primary"
        height="64"
        
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
              <v-btn class="mx-3" color="primary" depressed @click="$router.push(item.path)"><span class="">{{item.index}}</span></v-btn>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-text-field
                rounded solo
                dense 
                hide-details="false"
                class="mr-6"
                :append-icon="'mdi-magnify' "
                v-model="search"
                @keypress.enter="searchContacts"
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
                    color="white"
                  >
                    <img
                      :src="user.image"
                      alt="profile-avatar"
                      class="profile-avatar"
                    >
                  </v-avatar>
                  <v-icon
                    size="30px"
                    class="grey--text text--darken-3 mb-0"
                  >mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content
                  class="justify-center"
                >
                  <div class="mx-auto text-center">
                    <v-avatar
                      color="secondary"
                      class="mb-3"
                    >
                      <img
                      :src="user.image"
                      alt="profile-avatar"
                      class="profile-avatar"
                    >
                    </v-avatar>
                    <h3 class="overline">{{ user.name }} {{ user.last_name_1 }} {{ user.last_name_2 }}</h3>
                    <p class="caption mt-1">
                      {{ user.email }}
                    </p>
                    <div v-for="item in submenu" v-bind:key="item.index">
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      depressed
                      rounded
                      text
                      @click="$router.push(item.path)"
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
                      @click="signOff"
                    >
                      Cerrar sesión
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-container>
      </v-app-bar>
      <div class="min-90">
        <router-view></router-view>
      </div>
    </div>

    <div class="hidden-lg-and-up">
      <v-card class="pt-1">
      <v-app-bar
        app
        color="primary"
        tile
        dark>
        <v-app-bar-nav-icon @click="drawer = true" class="black--text"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-img
          src="../assets/img/logo_letras.png"
          alt="logotipo-making-wishes"
          class="mr-5"
          max-height="40px"
          max-width="150px"
        ></v-img>
        </v-toolbar-title>
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
            flat          >
            <v-list-item-title class="title pb-2">Making Wishes </v-list-item-title>
            <v-list-item-group
              v-for="(item) in menu" v-bind:key="item.index"
            >
              <v-list-item>
                <v-icon size="20px" class="pa-3 grey--text text--darken-3">mdi-{{item.icon}}</v-icon>
                <v-list-item-title @click="$router.push(item.path)">{{item.index}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
            <v-divider class="my-3"></v-divider>
            <v-list-item-group
              v-for="(item) in submenu" :key="item.index"
            >
              <v-list-item @click="$router.push(item.path)">
                <v-icon size="20px" class="pa-3 grey--text text--darken-3">mdi-{{item.icon}}</v-icon>
                <v-list-item-title >{{item.index}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
            <v-text-field
                  rounded outlined
                  dense
                  hide-details="false"
                  :append-icon="'mdi-magnify' "
                  v-model="search"
                  @keypress.enter="searchContacts"
                  placeholder="Buscar personas"
                  required
            ></v-text-field>
            <v-list-item @click="signOff" color="primary" class="mt-4">
                <v-list-item-title class="primary--text text-center text-button">Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <div class="min-90">
          <router-view></router-view>
        </div>
      </v-card>
    </div>
    <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="secondary lighten-0 white--text text-center"
      width="100%"
    >

      <v-card-text class="white--text">
        <h2 class="mb-6 mt-2">Haz los deseos realidad</h2>
        <div>Cuenta a tus amigos lo que siempre has querido que te regalen. Escucha lo que siempre quisieron que les regalases.</div>
        <div class="mt-2">¡Ahora es la oportunidad de que todos acierten!</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <v-row>
          <v-col>
            <div>
              <a href="https://www.facebook.es"><v-icon size="30px" class="pa-1 text--white">mdi-facebook</v-icon></a>
              <a href="https://www.instagram.com"><v-icon size="30px" class="pa-1 text--white">mdi-instagram</v-icon></a>
            </div>
            <div>
              <a href="https://www.twitter.com"> <v-icon size="30px" class="pa-1 text--white">mdi-twitter</v-icon> </a>              
              <a href="https://www.linkedin.com"><v-icon size="30px" class="pa-1 text--white">mdi-linkedin</v-icon></a>
            </div>
          </v-col>
          <v-col>
           <div><a class="white--text"  @click="$router.push('/home/legal-warning')"> Aviso legal</a></div>
           <div><a class="white--text" @click="$router.push('/home/legal-warning')"> Política de privacidad</a></div>
           <div><a class="white--text" @click="$router.push('/home/legal-warning')"> Condiciones de uso</a></div>
          </v-col>
          <v-col class="text-overline">
           <div> Diseñador web:</div>
           <div class="text-caption">Laura Martín</div> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'

    export default {
      name: "Making-Wishes",
        data() {
            return {
              menu:[
                {
                  index: "Inicio",
                  icon: "reorder-horizontal",
                  path: "/home"
                },
                {
                  index: "Mis deseos",
                  icon: "thought-bubble-outline",
                  path: "/home/wishes"
                },
                {
                  index: "Mis grupos",
                  icon: "account-group-outline",
                  path: "/home/groups"
                },
                {
                  index: "Mis contactos",
                  icon: "account-box-outline",
                  path: "/home/contacts"
                }
              ],
              submenu:[
                {
                  index: "Configuración de la cuenta",
                  icon: "cog-outline",
                  path: "/home/config"
                },
                {
                  index: "Notificaciones",
                  icon: "bell-alert-outline",
                  path: "/home/notifications"
                },
                {
                  index: "Crear grupo",
                  icon: "account-multiple-plus-outline",
                  path: "/home/creategroup"
                }
              ],
              drawer: false,
              search: ''
            }
        },
        methods: {
          async signOff() {
            let response = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+'/signoff')
            if (response.data === "signoff") {
              localStorage.clear();
              this.$router.push ("/")
            }
          },
          searchContacts(){
            this.actSearchContacts(this.search)
            this.$router.push("searchcontacts")
          },
          ...mapActions([
            'actSearchContacts'
          ])
        },computed:{
          ...mapState(['user'])
        },
        beforeMount() {
          if (!localStorage.getItem("token")) {
            this.$router.push("/")
          }
        },
        beforeUpdate() {
          this.user.image = process.env.VUE_APP_SERVER_IMG_PATH+this.user.route_image
        }
    }
</script>
<style scooped>
    .err{
        color:red;
    }
    a{
      text-decoration: none;
    }
    .min-90 {
      min-height: 73vh;
    }
    h2 {
      letter-spacing: 0.2rem;
    }
    .toolbar-title {
      font-size: 30px;
    }
    .profile-avatar {
      object-fit: cover;
    }
</style>