<template>
  <v-container class="mt-14">
    <div class="text-justify">
      <div class="d-flex justify-center flex-column pt-16">
        <h1 class="text-center text--secondary">
          Ten tu propia lista de deseos
        </h1>
        <div class="py-8">
          <p class="txt mb-4">
            ¿No has soñado siempre con que la gente acierte con los regalos que
            te hacen? Ahora esto es posible gracias a
            <strong>Making Wishes</strong>. Making Wishes pone al alcance de
            todos sus usuarios personalizar una lista de deseos. Esta lista
            podrán verla todos tus contactos para que no se les escape ningún
            detalle.
          </p>
          <div class="txt d-flex justify-end">
              <v-btn class="white--text" color="primaryLight">Ver mi lista</v-btn>
          </div>
        </div>
      </div>
      <v-divider class="primaryLight"></v-divider>
      <div class="d-flex justify-center flex-column py-16">
        <div>
          <h2 class="text-center">Junta a todos tus contactos</h2>
        </div>
        <div class="pt-6 d-flex flex-wrap parr-txt justify-center">
          <div class="item mx-10 mt-3">
            <h3>Haz tu propio grupo</h3>
            <p>
              ¿Se acerca un momento único en tu vida? Ahora podrás crear un
              grupo para tus eventos más especiales. Junta a todos tus seres
              queridos en un grupo y ayúdales a saber qué necesitas en tu nueva
              etapa de la vida.
            </p>
          </div>
          <div class="item mx-10 mt-3">
            <h3>Consulta tus grupos</h3>
            <p>
              ¿Tu mejor amigo se casa? Ahora él podrá crear una lista de deseos
              e incluir en ella a sus invitados. De esta manera todos los
              invitados estarán al día de los regalos que necesita y de esta manera
              nadie repetirá ningún regalo.
            </p>
          </div>
        </div>
      </div>
      <v-divider class="primaryLight"></v-divider>
      <div class="d-flex justify-center flex-column py-16">
        <h1 class="text-center text--secondary">
          ¡Conoce qué regalar a tus amigos!
        </h1>
        <p class="py-8 txt">
          Al igual que tú, tus amigos también tendrán una lista de deseos
          individual. Ahora estarás alerta para saber qué regalar a la gente que
          más quieres. Podrás visualizar las listas de todos tus contactos y...
          ¡Acertar siempre!
        </p>
        <div class="txt d-flex justify-end">
              <v-btn class="white--text" color="primaryLight">Ver mis contactos</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style scoped>
.v-divider {
  width: 70%;
  margin: auto;
}
h1,
h2 {
  letter-spacing: 0.26rem;
  font-weight: 400;
  text-transform: uppercase;
}
.txt {
  line-height: 2;
  width: 80%;
  margin: 0 auto;
}
.item {
  width: 300px;
  margin: auto;
}
</style>