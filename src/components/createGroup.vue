<template>
  <v-container class="form d-flex justify-center mt-8">
    <v-card color="secondaryLight" width="100%" min-width="300px" elevation="10">
        <v-card-text>
            <span class="white--text">Nombre del grupo:</span>
            <div class="err" >
                <div v-if="$v.new_group.group_name.$dirty && !$v.new_group.group_name.required">Este campo es requerido.</div>
            </div>
            <v-text-field 
                solo dense
                v-model.trim="$v.new_group.group_name.$model"
            ></v-text-field>
            <span class="white--text">Descripción del grupo:</span>
            <div class="err" >
                <div v-if="$v.new_group.group_description.$dirty && !$v.new_group.group_description.required">Este campo es requerido.</div>
                <div v-if="$v.new_group.group_description.$dirty && !$v.new_group.group_description.maxLength">Máximo 1000 caracteres.</div>
            </div>
            <v-textarea
                solo
                name="input-7-4"
                hint="Máximo 1000 caracteres"
                height="100px"
                label="Máximo 1000 caracteres."
                v-model.trim="$v.new_group.group_description.$model"
                ></v-textarea>
            <span class="white--text">Imagen del grupo:</span>
            <v-file-input
                prepend-icon="mdi-camera"
                solo
                dense
                id="img_group"
                accept="image/png, image/jpeg"
                placeholder="Selecciona una imagen (Opcional)"
                v-model.trim="new_group.group_img"
            ></v-file-input>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between">

            <v-btn @click="createGroup" color="primary">Enviar</v-btn>
            <v-btn @click="cleanData">Limpiar</v-btn>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
import {required, maxLength} from "vuelidate/lib/validators";

  export default {
    name: 'createGroup',

    data: () => ({
        new_group: {
            "group_name":"",
            "group_description":"",
            "group_img":[]
        },      
    }),
    validations: {
        new_group: {
            group_description: {
                required,
                maxLength: maxLength(1000)
            },
            group_name: {
                required
            }
        }
    },
    methods: {
        cleanData() {
            this.new_group.group_name = ""
            this.new_group.group_description = ""
            this.new_group.group_img = []
        },
        async createGroup(){
            let fd = new FormData();

            let file = document.getElementById('img_group').files[0];
            fd.append('group_img',file);
            fd.append('group_name',this.new_group.group_name);
            fd.append('group_description',this.new_group.group_description);

            console.log(fd)

            let response = await axios.post(process.env.VUE_APP_SERVER_TOTAL_PATH+"/createGroup", fd)
            
            if(response.data.text) {
                window.scrollTo(0,0)
                window.location.reload()
            }
        }
    }
  }
</script>

<style scoped>
.err{
    color: black;
    font-size: 11px;
}
</style>