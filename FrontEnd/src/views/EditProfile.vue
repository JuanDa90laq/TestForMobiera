<template>
  <v-container class="pt-16">
    <v-text-field v-model="user.id" label="Id" disabled></v-text-field>
    <v-form ref="form" v-model="valid" lazy-validation>
      
      <v-text-field
        v-model="user.user"
        :counter="10"
        :rules="userRules"
        label="User"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.name"
        :rules="userRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.lastname"
        :rules="userRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="passwordRules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        label="Password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Save
      </v-btn>
    </v-form>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar 
      v-model="snackbar" 
      :timeout="2000"
      color="success">
      User updated
    </v-snackbar>
  </v-container>
</template>

<script>
import { UserService } from "@/services/userService";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "EditProfile",

  components: {
    Banner: () => import("@/components/home/Banner"),
  },

  data: () => ({
    valid: true,
    user: {},
    userRules: [(v) => !!v || "User is required"],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    select: null,
    show: false,
    snackbar: false,
    overlay: false,
  }),

  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    async validate() {
      if (this.$refs.form.validate()) {
        await this.updateUser();
      }
    },
    async updateUser() {
      this.overlay = true;
      let response = await UserService.UpdateUser(this.user);
      if (response.success && response.data.length > 0) {
        this.setUser(response.data[0]);
      }
      this.overlay = false;
      this.snackbar = response.success;
    },
  },
  async created() {
    this.user = this.getUser;
  },
};
</script>
