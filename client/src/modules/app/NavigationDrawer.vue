<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="isMini"
        fixed
        app
        :width="200"
        clipped
      >
        <v-list>
          <v-list-tile
            v-for="nav in navigation"
            :key="nav.title"
            @click="$router.push({name: nav.route})">
            <v-list-tile-action>
              <v-icon>{{nav.ico}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="py-2">
              <v-list-tile-title class="body-2">{{ nav.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed color="white" clipped-left :height="64">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="font-weight-black headline primary--text" >TWORK
          <sub class="header__tagline"> by Rademade</sub>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat href icon>
            <Profile/>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
  </div>
</template>

<script>
  import Profile from "./Profile";
  export default {
    components: {
      Profile
    },
    data() {
      return {
        isMini: false,
        drawer: false,
        navigation: [
          { title: "Timer", ico: "alarm", route: "timer-list"},
          { title: "Projects", ico: "work", route: "projects"},
          { title: "Reports", ico: "assessment", route: "reports"}
        ]
      }
    },
    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
    },
    beforeDestroy () {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize, { passive: true })
      }
    },
    methods: {
     onResize () {
      this.isMini = window.innerWidth < 600
     }
   }
  }
</script>

<style>
  .header__tagline {
    font-size: 0.7rem;
  }
</style>
