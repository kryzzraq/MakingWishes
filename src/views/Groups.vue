<template>
<v-container  class="pt-12 pt-md-16 d-flex flex-column align-center">
    <div v-if="Object.keys(this.groups).length === 0 && Object.keys(this.ownGroups).length === 0" class="mt-10 d-flex flex-column align-center">
        <h3 class="text-center">
          Vaya... Parece que aún no perteneces a ningún grupo.
        </h3>
        <h4 class="pt-4 text--secondary">¿Qué te parece si creas uno?</h4>
    </div>
    <div v-if="Object.keys(this.ownGroups).length != 0" class="mt-10 d-flex flex-column align-center px-4">
        <h3 class="text-center my-3">Estos son los grupos que has creado</h3>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="item in ownGroups" v-bind:key="item.name">
                <v-card
                    
                    class="ma-4"
                    max-width="300"
                    :to="'/home/ownGroup/'+item.id_group"
                    hover
                >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="img_path+item.route_image"
                    alt="img_group"
                    >
                    </v-img>

                    <v-card-title class="pb-0">
                    {{item.name}}
                    </v-card-title>

                    <v-card-text class="text--primary">
                        <div>{{item.description}}</div>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
    <div v-if="Object.keys(this.groups).length !== 0" class="mt-10 d-flex flex-column align-center px-4">
        <h3 class="text-center my-3">Estos son los grupos a los que perteneces</h3>
    </div>
        <div class="d-flex flex-wrap justify-center">
            <div v-for="item in groups" v-bind:key="item.name">
                <v-card
                    
                    class="ma-4"
                    max-width="300"
                    :to="'/home/group/'+item.id_group"
                    hover
                >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="img_path+item.route_image"
                    alt="img_group"
                    >
                    </v-img>

                    <v-card-title class="pb-0">
                    {{item.name}}
                    </v-card-title>

                    <v-card-text class="text--primary">
                        <div>{{item.description}}</div>
                    </v-card-text>
                </v-card>
            </div>
        </div>       
        <h3 
        v-if="Object.keys(this.groups).length !== 0 || Object.keys(this.ownGroups).length !== 0"
        class="mt-8"
        >
          Aquí podrás crear un grupo para cualquier evento.
        </h3> 
    <create-group/>
       
</v-container>
    
</template>

<script>
import axios from 'axios'
import createGroup from '@/components/createGroup.vue';
import {mapState} from 'vuex'


export default {
    name: "groups",
    components: {
        createGroup
    },
    data() {
        return {
            img_path: process.env.VUE_APP_SERVER_IMG_PATH,
            ownGroups:[

            ]         
        }
    },
    computed:{
        ...mapState(['groups'])
    },
    async beforeMount(){
        let responseOwnGroups = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadOwnGroups");
        this.ownGroups = responseOwnGroups.data

    }
}
</script>

<style scoped>
h3, h4 {
    letter-spacing: 0.26rem;
    font-weight: 400;
    text-transform: uppercase;
}
</style>