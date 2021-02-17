<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer" />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/pngegg.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />

        <v-btn
          class="hidden-sm-and-down"
          text
          @click="onClick($event, '/Home')"
        >
          Home
        </v-btn>

        <v-btn
          v-if="getUser != null"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, '/Edit')"
        >
          My profile
        </v-btn>

        <v-spacer />
        <v-tooltip bottom v-if="getUser == null">
          <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="Login()" v-bind="attrs" v-on="on">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        </template>
          <span>LogIn</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="Logout()" v-bind="attrs" v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>LogOut</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoreAppBar",

  computed: {
    ...mapGetters(["links", "getUser"]),
  },

  methods: {
    ...mapMutations(["toggleDrawer", "setUser"]),
    onClick(e, item) {
      e.stopPropagation();

      this.$router.push({
        path: item,
      });
    },
    Login() {
      this.$router.push({
        path: "/Login",
      });
    },
    Logout() {
      this.setUser(null);
      this.$router.push({
        path: "/Login",
      });
    },
  },
};
</script>
