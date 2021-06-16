<template>
    <v-container class="mt-16">
        <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            :search="search"
            :header-props="{ sortByText: 'Ordenar por' }"
            class="elevation-2"
            sort-by="name"
        >
        <template v-slot:item.route_image="{ item }" class="mt-10">
            <v-avatar
                tile
            >
                <img
                    class="profile-avatar"
                    :src="img_path+item.route_image"
                    alt="avatar"
                >
            </v-avatar>
        </template>
        <template v-slot:item.name="{ item }" class="mt-10">
            <span class="name">{{item.name}} {{item.last_name_1}} {{item.last_name_2}}</span>
        </template>
        <template v-slot:item.rol="{ item }" class="mt-10">
            <span class="name">{{item.rol}}</span>
        </template>
            <template v-slot:top class="colorize">               
                    <v-toolbar-title class="px-4 py-8"> <h4 class="white--text pb-3">Todos los usuarios</h4>
                    <v-text-field 
                        dense
                        v-model="search"
                        color="secondary"
                        append-icon="mdi-magnify"
                        hide-details
                        label="Buscar"
                        secondary
                    ></v-text-field>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>                    
            </template>
            <template v-slot:item.actions="{ item }">            
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon 
                        color="secondaryLight"
                        @click="$router.push('/home/admin/user/'+item.id_user)">
                            <v-icon color="primary"> mdi-eye</v-icon>
                        </v-btn>
                    </template>
                    <span>Consultar datos</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <span>Aún no tienes contactos.</span>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
    name: "adminUsers",
    computed:{
        ...mapState(['user'])
    },
    data(){
        return{
            headers: [
                {
                    text: 'Imagen',
                    align: 'start',
                    sortable: false,
                    value: 'route_image',
                },
                { text: 'Nombre y apellidos', value: 'name' },
                { text: 'Correo electrónico', value: 'email' },
                { text: 'Rol', value: 'rol' },
                { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
            ],  
            users: [

            ],
            search:'',
            img_path: process.env.VUE_APP_SERVER_IMG_PATH
        }
    },
    async beforeMount(){
        if(this.user.rol!=='admin'){
            this.$router.push("/home/unauthorized")
        }

        let responseAllGroups = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadAllUsersAdmin");
        this.users = responseAllGroups.data
    }
}
</script>

<style scoped>
.v-toolbar__title{
        background-color: #F08080;
}
h4 {
    letter-spacing: 0.26rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>