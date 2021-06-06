<template>
    <v-container  class="py-12 py-md-16">
        <div class="mt-10 d-flex flex-column align-center">
            <h3 class="text-center">
                Configuración de la cuenta
            </h3>
            <div class="py-2">Aquí podrás cambiar tu contraseña y avatar</div>
            <v-card color="secondaryLight" width="50%" min-width="300px" elevation="10" class="my-6 pt-4">
                <v-card-text>
                    <div>
                        <!-- <div class="err ml-1" >
                        <div v-if="$v.user.password.password.$dirty && !$v.user.password.password.required">Este campo es requerido.</div>
                        <div v-if="$v.user.password.password.$dirty && !$v.user.password.password.minLength">Mínimo 8 caracteres.</div>
                        </div> 
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        -->
                        <v-text-field
                        solo
                        dense
                    
                        placeholder="Introduzca una contraseña"
                        hint="Contraseña"
                        required
                        ></v-text-field>
                    </div>
                    <div>
                        <!-- <div class="err ml-1" >
                        <div v-if="$v.user.password.confirm.$dirty && !$v.user.password.confirm.sameAsPassword">Las contraseñas no coinciden.</div>
                        </div>
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        -->
                        <v-text-field
                        solo
                        dense
                        class="red--text"
                        placeholder="Confirma la contraseña"
                    
                        hint="Confirma la contraseña"
                        required
                        ></v-text-field>                      
                    </div>
                    <v-btn block  color="primary"
                    >Cambiar contraseña</v-btn>
                </v-card-text>
            </v-card>
            <v-card color="secondaryLight" width="50%" min-width="300px" elevation="10" class="my-6 pt-4">
                <v-card-text>
                    <div>
                        <v-file-input
                        prepend-icon="mdi-camera"
                        solo
                        dense
                        id="avatar"
                        accept="image/png, image/jpeg"
                        placeholder="Selecciona una foto"
                        ></v-file-input>
                    </div>
                    <v-btn block  color="primary"
                    >Cambiar avatar</v-btn>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import {mapState} from 'vuex'

export default {
    name: "Config",
    computed:{
        ...mapState(['user'])
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