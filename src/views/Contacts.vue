<template>
<v-container class="py-12 py-md-16">
    <div v-if="Object.keys(this.contacts).length === 0" class="mt-10 d-flex flex-column align-center">
        <h3 class="text-center">
          Vaya... Parece que aún no tienes ningún contacto.
        </h3>
        <h4 class="py-4 text--secondary">¿Qué te parece si añades uno?</h4>
        
        </div>
        
</v-container>
    
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: "wishes",
    data() {
        return {
           
        }
    },
    methods: {
        
    },
    computed:{
        ...mapState(['contacts'])
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