<template>
  <div id="home">
    <articles>
      <banner />
    </articles>

    <about />
    <social />
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Home",

  components: {
    About: () => import("@/components/home/About"),
    Articles: () => import("@/components/home/Articles"),
    Banner: () => import("@/components/home/Banner"),
    Social: () => import("@/components/home/Social"),
  },

  data: () => ({
    overlay: false,
  }),
  methods: {
    ...mapActions(["getArticles"]),
    ...mapMutations(["setArticles"]),
  },

  async mounted() {
    this.overlay = true;
    let response = await this.getArticles();
    this.setArticles(response.data);
    this.overlay = false;
  },
};
</script>
