<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="isMini"
        clipped
        fixed
        app
        :width="180"
      >
        <v-list dense>
          <v-list-tile
            v-for="nav in navigation"
            :key="nav.title"
            @click="$router.push({name: nav.route})">
            <v-list-tile-action>
              <v-icon>{{nav.ico}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ nav.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Twork</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn>
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
        drawer: true,
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
