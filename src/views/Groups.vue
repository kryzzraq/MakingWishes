<template>
<v-container  class="py-12 py-md-16">
    <div v-if="Object.keys(this.groups).length === 0" class="mt-10 d-flex flex-column align-center">
        <h3 class="text-center">
          Vaya... Parece que aún no perteneces a ningún grupo.
        </h3>
        <h4 class="py-4 text--secondary">¿Qué te parece si creas uno?</h4>
        <div>Aquí podrás añadir todos los deseos que quieras que los demás conozcan.</div>
        
    </div>
    
    <create-group/>
       
</v-container>
    
</template>

<script>
import axios from 'axios'
import createGroup from '@/components/createGroup.vue';
import {mapState} from 'vuex'


export default {
    name: "wishes",
    components: {
        createGroup
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    computed:{
        ...mapState(['groups'])
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