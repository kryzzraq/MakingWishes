<template class="d-flex align-center">
    <v-container class="mt-10 pb-8">
        <div>
            <h2 class="mt-10 text-center">Administrar elementos</h2>
        </div>
        <div class="d-flex flex-wrap justify-space-around ">
            <v-card
                class="mx-auto mt-10"
                max-width="344"
                hover
                to="/home/admin/groups"
            >
                <v-img
                :src="img_path+'/upload/group_anon.png'"
                height="250px"
                ></v-img>

                <v-card-title>
                    <h5>Administrar grupos</h5> 
                </v-card-title>

                <v-card-subtitle>
                Aquí podrás ver todos los grupos, buscarlos, consultarlos y eliminarlos.
                </v-card-subtitle>
            </v-card>
            <v-card
                class="mx-auto mt-10"
                max-width="344"
                hover
                to="/home/admin/users"
            >
                <v-img
                :src="img_path+'/upload/user_anon.png'"
                height="250px"
                ></v-img>

                <v-card-title>
                    <h5>Administrar usuarios</h5> 
                </v-card-title>

                <v-card-subtitle>
                Aquí podrás ver todos los usuarios, buscarlos, modificar sus datos y eliminarlos.
                </v-card-subtitle>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "admin",
    computed:{
        ...mapState(['user'])
    },
    data(){
        return{
            show: false,
            show1: false,
            img_path: process.env.VUE_APP_SERVER_IMG_PATH
        }
    },
    beforeMount(){
        if(this.user.rol !== 'admin'){
            this.$router.push("/home/unauthorized")
        }
    }
}
</script>

<style scoped>
h2, h5{
    letter-spacing: 0.26rem;
    font-weight: 500;
    text-transform: uppercase;
}
</style>