<template>
  <v-app id="inspire" >
    <NavigationDrawer/>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import NavigationDrawer from './NavigationDrawer';

  export default {
    components: {
      NavigationDrawer
    }
  };
</script>
