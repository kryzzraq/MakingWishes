<template>
    <v-container class="mt-16 pt-4" :key="forceRender">
        <div v-if="Object.keys(this.notificationsUser).length !== 0 || Object.keys(this.notificationsGroup).length !== 0">
            <h2 class="text-center pt-sm-1 pb-2 pt-lg-4">Tus NOTIFICACIONES PENDIENTES</h2>
            <h3 class="pt-2">Notificaciones de amistad:</h3>            
            <div v-for="notif in notificationsUser" :key="notif.id_notif" class="ml-4">
                <div v-if="notif.kind == `friendship` && notif.recibed === `no`" class="d-flex ">
                    <div class="container-data align-self-center text-body-1"> <span class="text-capitalize"> {{notif.name}} {{notif.last_name_1}} {{notif.last_name_2}}</span> te ha mandado una peticion de amistad</div>
                    <div class="d-flex flex-wrap justify-center data-button">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon 
                                color="secondaryLight"
                                @click="acceptFriend(notif)">
                                   <v-icon color="green">mdi-account-plus-outline</v-icon> 
                                </v-btn>
                            </template>
                            <span>Aceptar petición de amistad</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon 
                                color="secondaryLight"
                                @click="readedNotifGroup(notif)"
                                >
                                    <v-icon color="red">mdi-close</v-icon> 
                                </v-btn>
                            </template>
                            <span>Rechazar petición de amistad</span>
                        </v-tooltip>
                    </div>
                </div>
            </div>
            <h3 class="pt-4">Notificaciones de grupos:</h3>
            <div v-for="notif in notificationsGroup" :key="notif.id_notif" class="ml-4">
                <div v-if="notif.kind == `group` && notif.recibed === `no`" class="d-flex justify-space-between">
                    <div class="container-data align-self-center text-body-1">Te han incluido en el grupo <span class="text-capitalize">"{{notif.name}}"</span></div>
                    <div class="d-flex flex-wrap justify-center data-button">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon 
                                @click="readedNotifGroup(notif)"
                                >
                                   <v-icon color="green">mdi-check</v-icon> 
                                </v-btn>
                            </template>
                            <span>Marcar como leído</span>
                        </v-tooltip>
                       
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h4 class="text-center">NO TIENES NOTIFICACIONES PENDIENTES</h4>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Notification",
    data(){
        return{
            notificationsUser: [

            ],
            notificationsGroup: [

            ],
            forceRender: 0
        }
    },
    async beforeMount(){
        let responseNotiUser = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadNotifUsers");
        if(responseNotiUser.data){
            this.notificationsUser = responseNotiUser.data
        }

        let responseNotifGroup = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadNotifGroup");
        if(responseNotifGroup.data){
            this.notificationsGroup = responseNotifGroup.data
        }
        
    },
    methods: {
        acceptFriend(id){
            console.log(id);
        },
        declineFriend(id){
            console.log(id);
        },
        async readedNotifGroup(notif){
            let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/readNotif",{
                "id_notif":notif.id_notif
            })

            let responseNotiUser = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadNotifUsers");
            if(responseNotiUser.data){
                this.notificationsUser = responseNotiUser.data
            }

            let responseNotifGroup = await axios.get(process.env.VUE_APP_SERVER_TOTAL_PATH+"/loadNotifGroup");
            if(responseNotifGroup.data){
                this.notificationsGroup = responseNotifGroup.data
            }
            this.forceRender += 1
        }
    }
}
</script>

<style scoped>

h2, h3{
    letter-spacing: 0.26rem;
    font-weight: 500;
    text-transform: uppercase;
}
h4{
    letter-spacing: 0.1rem;
    font-weight: 400;
}
.container-data{
    width: 75%;
}
.data-button{
    width: 25%;
}
</style>