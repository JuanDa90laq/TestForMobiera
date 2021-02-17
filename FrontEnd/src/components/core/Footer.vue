<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
    <v-container class="mx-auto">
      <v-row>
        <v-col cols="9">
          {{ new Date().getFullYear() }} — <strong>JuanDa</strong>
        </v-col>
        <v-spacer />

        <base-btn
          class="mr-0"
          square
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </base-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'CoreFooter',

    data: () => ({
    }),
  }
</script>
