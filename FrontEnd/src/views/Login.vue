<template>
  <v-container class="pt-16">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="user"
        :rules="userRules"
        label="User"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        label="Password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">
        Log In
      </v-btn>

      <v-btn color="error" class="mr-4"> Create an account </v-btn>
    </v-form>
    <v-snackbar 
      v-model="snackbar" 
      :top="true" 
      :right="true" 
      :timeout="3000"
      color="error">
      User or password incorrect please check the values
      <template v-slot:action="{ attrs }">
        <v-btn icon @click="snackbar = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { UserService } from "@/services/userService";
import { mapMutations } from "vuex";

export default {
  name: "Login",

  components: {
    Banner: () => import("@/components/home/Banner"),
  },

  data: () => ({
    valid: true,
    user: "",
    userRules: [(v) => !!v || "User is required"],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    select: null,
    show: false,
    snackbar: false,
  }),

  methods: {
    ...mapMutations(["setUser"]),
    async validate() {
      if (this.$refs.form.validate()) {
        await this.getUser();
      }
    },

    async getUser() {
      let response = await UserService.GetLoggedUser(this.user, this.password);
      if (response.success && response.data.length > 0) {
        this.setUser(response.data[0]);
        this.$router.push({
          path: "/Home",
        });
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>
