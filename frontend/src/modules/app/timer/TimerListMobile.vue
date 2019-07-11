<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 v-if="activeTimeEntry">
      <ActiveTimer/>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card>
        <div v-for="(timeEntries, date) in timeEntryGroups" :key="date">
          <TimerListGroup two-line subheader :timeEntriesDate="date" :timeEntries="timeEntries"> </TimerListGroup>
          <v-divider></v-divider>
        </div>
        <v-btn
              color="red darken-4"
              dark
              fixed
              bottom
              right
              fab
              @click="createNewTimer"
            >
              <v-icon>add</v-icon>
          </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import addToHomeScreen from "@/core/services/addToHomeScreen";
  import subscriptionsManager from  "@/core/services/subscriptionsManager";
  import TimerListGroup from "./timer-list-mobile/TimerListGroup";
  import ActiveTimer from "./timer-list-mobile/ActiveTimer";

  export default {
    components: {
      TimerListGroup,
      ActiveTimer
    },
    data: () => {
      return {
        selected: [2]
      }
    },
    computed: {
      ...mapGetters({
        stoppedTimeEntries: 'timers/stoppedTimeEntries',
        activeTimeEntry: "timers/activeTimeEntry"
      }),
      timeEntryGroups() {
        return this.$_.groupBy(this.stoppedTimeEntries, (timeEntry) => {
          let entryStartOfDay = this.$moment(timeEntry.startedAt).clone().startOf("day").format("ddd, D MMM");
          let todayStartOfDay = this.$moment().startOf("day").format("ddd, D MMM");
          let yesterdayStartOfDay = this.$moment().subtract(1, "day").startOf("day").format("ddd, D MMM");
          if (entryStartOfDay == todayStartOfDay) { return "Today" }
          if (entryStartOfDay == yesterdayStartOfDay) { return "Yesterday" }
          return this.$moment(timeEntry.startedAt).format("ddd, D MMM");
        });
      }
    },
    methods: {
      ...mapActions({
        createTimeEntry: 'timers/createTimeEntry'
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
      },
      createNewTimer() {
        this.createTimeEntry({startedAt: this.$moment().toISOString()}).then(timeEntry => {
          this.$router.push({ name: "timer-item", params: {id: timeEntry.id }});
        });
      }
    },
    created() {
      if (addToHomeScreen.isPromptAllowed()) { addToHomeScreen.showPrompt() }
      this.requestNotificationPermitions();
    }
  }
</script>
