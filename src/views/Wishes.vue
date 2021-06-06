<template>
<v-container class="py-12 py-md-16">
    <div v-if="Object.keys(this.wishes).length === 0" class="mt-10 d-flex flex-column align-center px-4">
        <h3 class="text-center">
          Vaya... Parece que aún no tienes ningún deseo en tu lista.
        </h3>
        <h4 class="py-4 text--secondary">¿Qué te parece si añades alguno?</h4>
        <div>Aquí podrás añadir todos los deseos que quieras que los demás conozcan.</div>
           
        </div>
        <v-container min-width="300px" class="pb-8">
            <v-expansion-panels hover >
                <v-expansion-panel>
                    <v-expansion-panel-header ripple>Despliega si quieres saber más acerca de las listas de deseos:</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div>Las listas de deseos se conforman de los siguientes elementos:</div>
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
        <v-container class="form d-flex justify-center">
            <v-card width="100%" min-width="300px" elevation="10" color="secondaryLight">
                <v-card-text>
                    <span class="white--text">Nombre del deseo:</span>
                    <v-text-field 
                        solo dense
                    ></v-text-field>
                    <span class="white--text" >Descripción del deseo:</span>
                    <v-textarea
                        solo
                        name="input-7-4"
                        hint="Máximo 1000 caracteres"
                        height="100px"
                        label="Máximo 1000 caracteres."
                        ></v-textarea>
                    <span class="white--text">Link del deseo:</span>
                    <v-text-field 
                        solo dense
                    ></v-text-field>
                </v-card-text>
                <v-card-text class="d-flex justify-space-between">

                    <v-btn color="primary">Enviar</v-btn>
                    <v-btn>Limpiar</v-btn>
                </v-card-text>
            </v-card>
        </v-container>
</v-container>
    
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: "wishes",
    data() {
        return {
            description: [
                {
                    "name": "Nombre:",
                    "description": "Nombre descriptivo del deseo.",
                    "example": "Por ejemplo: Camisa."
                },
                {
                    "name": "Descripción:",
                    "description": "Breve descripción del deseo.",
                    "example": "Color crudo, cuello mao, manga abullonada."
                },
                {
                    "name": "Link:",
                    "description": "Link de compra.",
                    "example": "https://www.zara.com/es/es/camisa-solapa-bordada-p03564096.html?v1=108980157&v2=1718175"
                },
                {
                    "name": "Disponibilidad:",
                    "description": "Aquí se muestra si alguien ha seleccionado ya tu deseo o no.",
                    "example": ""
                }
            ]
        }
    },
    methods: {
        
    },
    computed:{
        ...mapState(['wishes'])
    }    
}
</script>
<style scoped>
h3, h4 {
    letter-spacing: 0.26rem;
    font-weight: 400;
    text-transform: uppercase;
}
.v-list-item__title, .v-list-item__subtitle{
    white-space: inherit;
}
</style>