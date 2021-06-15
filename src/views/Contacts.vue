<template>
<v-container class="py-12 py-md-16" :key="forceRender">
    <v-snackbar
        v-if="dialogDelete"
        v-model="dialogDelete"
        :timeout="5000"
        color="secondaryMedium"
        dark
        top
        transition="fade-transition"
    >
        Amigo eliminado correctamente.
        <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="dialogDelete = false"
        >
            Ok
        </v-btn>
        </template>
    </v-snackbar>

    <div v-if="Object.keys(this.contacts).length === 0" class="mt-10 d-flex flex-column align-center">
        <h3 class="text-center">
          Vaya... Parece que aún no tienes ningún contacto.
        </h3>
    </div>
    <div class="pt-12">
        <v-data-table
            :headers="headers"
            :items="contacts"
            :search="search"
            sort-by="name"
            :header-props="{ sortByText: 'Ordenar por' }"
            class="elevation-1"
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
            <template v-slot:top class="colorize">               
                    <v-toolbar-title class="px-4 py-8"> <h4 class="white--text pb-3">Mis contactos</h4>
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
                        @click="deleteItemConfirm(item)">
                            <v-icon color="primary"> mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Eliminar amugo</span>
                </v-tooltip> 
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon 
                        color="secondaryLight"
                        @click="consulttUser(item.id_user)">
                            <v-icon> mdi-eye</v-icon>
                        </v-btn>
                    </template>
                    <span>Consultar datos</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <span>Aún no tienes contactos.</span>
            </template>
        </v-data-table>
    </div>
</v-container>
            
    
</template>


<script>
import {mapState} from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
        search: "",
        dialog: false,
        forceRender:0,
        dialogDelete: false,
        headers: [
            {
            text: 'Avatar',
            align: 'start',
            sortable: false,
            value: 'route_image',
            },
            { text: 'Nombre y apellidos', value: 'name' },
            { text: 'Correo electrónico', value: 'email' },
            { text: 'Acciones', value: 'actions', sortable: false, align: 'center' },
        ],
        img_path: process.env.VUE_APP_SERVER_IMG_PATH,
        contacts:[]
    }),
    methods: {
        closeDelete(){
            this.dialogDelete = false    
        },
        async deleteItemConfirm(item){
            let response = await axios.post (process.env.VUE_APP_SERVER_TOTAL_PATH+"/deleteContact",
            {
                "id_contact": item.id_user
            })

            if(response.data.text){
                this.dialogDelete = true  
            }
            let responseContacts = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadContacts");
            this.contacts = responseContacts.data
            
            this.forceRender += 1
        },
        consulttUser(id){
            this.$router.push(`/home/contact/${id}`);
        }
    },
    async beforeMount() {
        let responseContacts = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadContacts");

        this.contacts = responseContacts.data
    }
  }
</script>

<style scoped>
h3, h4 {
    letter-spacing: 0.26rem;
    font-weight: 400;
    text-transform: uppercase;
}
h5 {
    letter-spacing: 0.1rem;
    font-weight: 500;
    text-transform: uppercase;
}
.profile-avatar {
      object-fit: cover;
    }
.v-toolbar__title{
        background-color: #F08080;
}
.name{
    text-transform: capitalize;
}
</style>