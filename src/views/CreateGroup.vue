<template class="py-16">
    <v-container class="mt-14 mt-lg-14">
        <v-container min-width="300px" class=" mt-xs-4 mt-md-8 d-flex flex-column align-center px-4">
        <h3 class="pa-4">Aquí podrás añadir crear grupos para tus eventos.</h3>
            <v-expansion-panels hover >
                <v-expansion-panel>
                    <v-expansion-panel-header ripple>Despliega si quieres saber más acerca de cómo crear grupos:</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div>Los grupos se conforman de los siguientes elementos:</div>
                        <v-list-item v-for="item in description" v-bind:key="item.name">
                            <v-list-item-content>
                                <v-list-item-title>{{item.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                                 <v-list-item-subtitle class="caption">{{item.example}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
         <create-group/>
    </v-container>
</template>

<script>
import createGroup from '@/components/createGroup.vue';

export default {
    name: "CreateGroup",
    components: {
        createGroup
    },
    data(){
        return  {
            description: [
                {
                    "name": "Nombre:",
                    "description": "Nombre descriptivo del grupo.",
                    "example": "Por ejemplo: Boda de Manuel y Cecilia."
                },
                {
                    "name": "Descripción:",
                    "description": "Breve del grupo.",
                    "example": "Por ejemplo: La boda se oficiará en la iglesia San Nicolás el día 11 de Agosto a las 12:00 horas."
                },
                {
                    "name": "Avatar:",
                    "description": "Imagen que define el grupo.",
                    "example": ""
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

    h3, h4 {
        letter-spacing: 0.26rem;
        font-weight: 400;
        text-transform: uppercase;
    }
</style>