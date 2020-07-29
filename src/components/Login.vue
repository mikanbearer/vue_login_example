<template>
  <v-app id="login">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="secondary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="rules.usernameRules"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="rules.passwordRules"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit" :loading="loading" :disabled="disabled">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      username: null,
      password: null,
      loading: false,
      disabled: true,
      showPassword: false,
      nonFieldErrors: [],
      rules: {
        usernameRules: [
         v => !!v || 'username is required',
        ],
        passwordRules: [
         v => !!v || 'password is required',
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    UserPassField() {return [this.username, this.password]}
  },

  watch: {
    UserPassField(value) {
      if (value[0] && value[1]) {
        this.disabled = false
      }
    }
  },

  methods: {
    ...mapActions(['login']),
    submit () {
      this.loading = true
      setTimeout(() => {this.loading = false}, 5000); 
      this.nonFieldErrors = []
      this.login([this.username, this.password]).then(
          () => this.$router.push('/'), 
          err => {
            console.log(err.response.data)
              this.nonFieldErrors = err.response.data.nonFieldErrors
              }
              )
    },
  },
}
</script>