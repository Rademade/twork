<template>
  <v-app id="inspire" >
    <NavigationDrawer/>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import NavigationDrawer from './NavigationDrawer';
  import { mapActions } from "vuex";
  import subscriptionsManager from  "@/core/services/subscriptionsManager";
  import addToHomeScreen from "@/core/services/addToHomeScreen";

  export default {
    components: {
      NavigationDrawer
    },
    methods: {
      ...mapActions({
        fetchTimeEntries: 'timers/fetchTimeEntries',
        fetchProjects: 'projects/fetchProjects'
      }),
      requestNotificationPermitions() {
        if (Notification && Notification.permission !== "granted") {
          Notification.requestPermission().then((result) => {
            if (result === 'granted' ) {
              subscriptionsManager.createSubscription()
            }
            return;
          });
        }
      }
    },
    created() {
      if (addToHomeScreen.isPromptAllowed()) { addToHomeScreen.showPrompt() }
      this.requestNotificationPermitions();
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fetchTimeEntries();
        vm.fetchProjects();
      })
    }
  };
</script>
