<template>
  <v-container class="mt-16 d-flex flex-column justify-center cont">
    <div class="d-flex">
      <div class="number align-self-center pr-4">401</div>
      <div class="d-flex flex-column justify-center">
        <h3>No estás autorizado</h3>
        <div class="text-body-1 pb-4 pr-4 text-justify">
          Lo sentimos pero Making Wishes no puede permitir el acceso a esta web.
        </div>
      </div>
    </div>
    <div class="text-body-1">
      <div>Aquí hay algunos consejos que puedes seguir:</div>
      <ul class="text-body-2 pt-2 text-justify pr-4">
        <li>
          Comprueba que la url a la que estás intentando acceder es correcta y
          asegúrate de que tu cuenta puede acceder a este contenido.
        </li>
        <li>
          Si sospechas que tienes que tener acceso a esta web ponte en contacto
          con el administrador de la web en el siguiente email:
          <strong>support@makingwishes.es</strong>
        </li>
        <li>
          Prueba a loguear con otra cuenta si quieres acceder a esta
          información.
        </li>
      </ul>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "Unauthorized",
};
</script>
<style scoped>
.cont {
  max-width: 600px;
}
.number {
  font-size: 100px;
  font-weight: 100;
  color: rgb(129, 129, 129);
}
h3 {
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1.5px;
}
</style>