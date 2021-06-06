<template class="py-16">
    <v-container class="mt-14 mt-lg-14">
        <div class="mt-2">
            Crear un grupo
        </div>
         <create-group/>
    </v-container>
</template>

<script>
import createGroup from '@/components/createGroup.vue';

export default {
    name: "CreateGroup",
    components: {
        createGroup
    }
}
</script>