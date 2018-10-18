<template>
  <div class="text-xs-center">
    <v-menu
       :close-on-content-click="false"
       v-model="isProfileMenuOpened"
       offset-y
       offset-x
    >
      <v-avatar
            :tile="false"
            :size="30"
            color="grey lighten-4"
            slot="activator"
          >
        <img  :src="user.imgUrl || 'https://placehold.it/50x50'" :alt="user.name"/>
      </v-avatar>
      <v-card>
        <v-list>
          <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="user.imgUrl || 'https://placehold.it/50x50'" :alt="user.name">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{user.name}}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import userAuthService from "@/core/services/userAuthService";

  export default  {
    name: "Profile",
    data: function () {
      return {
        isProfileMenuOpened: false,
        user: userAuthService.currentUser
      }
    },
    methods: {
      logout() {
        userAuthService.logout().then(() => this.$router.push({name: "home"}));
      }
    },
  }
</script>
