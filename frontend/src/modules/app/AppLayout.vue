<template>
  <v-app id="inspire" >
    <NavigationDrawer/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-snackbar
        v-model="snackbar"
        :bottom="true"
        :timeout="3000"
      >
        {{ snackbarText }}
        <v-btn
          color="red darken-4"
          flat
          @click="snackbar=false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-content>
    <v-footer height="auto" app inset>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 class="grey--text"><span> Made by <a class="grey--text underline">Rademade </a> &copy; 2019</span></v-flex>
        </v-layout>
      </v-container>
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
    data: () => ({
      snackbar: false,
      snackbarText: ''
    }),
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

      window.addEventListener('offline', () => {
        this.snackbar = true;
        this.snackbarText = 'You are offline'
      })

      window.addEventListener('online', () => {
        this.snackbar = true;
        this.snackbarText = 'You are online!'
      })

      // window.addEventListener('message', (event) => {
      //   alert('Message from sw ' +  JSON.stringify(event));
      // }, false)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fetchTimeEntries();
        vm.fetchProjects();
      })
    }
  };
</script>
