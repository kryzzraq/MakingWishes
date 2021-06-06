<template>
  <v-layout class="form d-flex justify-center mt-8">
    <v-card color="secondaryLight" width="100%" min-width="300px" elevation="10">
        <v-card-text>
            <span class="white--text">Nombre del grupo:</span>
            <v-text-field 
                solo dense
            ></v-text-field>
            <span class="white--text">Descripción del grupo:</span>
            <v-textarea
                solo
                name="input-7-4"
                hint="Máximo 1000 caracteres"
                height="100px"
                label="Máximo 1000 caracteres."
                ></v-textarea>
            <span class="white--text">Imagen del grupo:</span>
            <v-file-input
            prepend-icon="mdi-camera"
            solo
            dense
            id="avatar"
            accept="image/png, image/jpeg"
            placeholder="Selecciona una imagen (Opcional)"
            ></v-file-input>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between">

            <v-btn color="primary">Enviar</v-btn>
            <v-btn>Limpiar</v-btn>
        </v-card-text>
    </v-card>
</v-layout>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
    computed:{
        ...mapState(['wishes'])
    } 
  }
</script>
