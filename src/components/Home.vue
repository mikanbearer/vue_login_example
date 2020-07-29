<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link to="foo">
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="bar">
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="accent" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <v-row justify="center">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-row>
    </v-footer>
  </v-app>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data: () => ({
    drawer: null,
    }),

  computed: {
    ...mapGetters(['isLoggedIn']),
    state() {
      return this.isLoggedIn()
    },
  },
  
  created() {
    this.tryLoggedIn()
    this.startVerify()
  },

  destroyed() {
    this.stopVerify()
  },

  watch: {
    state(value) {
      if (!value) {
        this.logout()
        this.$router.push('/login')
      }
    }
  },

  methods: {
    ...mapActions(['tryLoggedIn', 'logout']),
    startVerify() {
      this.verify = setInterval(this.tryLoggedIn, 1000)
    },
    stopVerify() {
      clearInterval(this.verify)
    },
  },
}
</script>

<style>
</style>