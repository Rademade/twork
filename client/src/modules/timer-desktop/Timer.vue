<template>
  <v-layout row wrap>
    <v-flex lg12 pa-1> <TrackingBar/></v-flex>
    <v-flex lg12 pa-1> <TimerList/></v-flex>
  </v-layout>
</template>

<script>
  import TimerList from "./timer-list/TimerList"
  import TrackingBar from "./tracking-bar/TrackingBar";
  import { mapActions } from "vuex";
  import addToHomeScreen from "@/core/services/addToHomeScreen";
  import subscriptionsManager from  "@/core/services/subscriptionsManager";

  export default {
    name: 'Timer',
    components: {
      TimerList,
      TrackingBar
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
      this.requestNotificationPermitions()
      this.fetchTimeEntries();
      this.fetchProjects();
    },
  }
</script>
