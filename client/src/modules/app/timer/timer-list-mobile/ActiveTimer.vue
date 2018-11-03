<template>
  <v-card fixed>
    <v-card-title primary-title>
      <div>
        <router-link :to="{ name: 'timer-item', params: { id: timeEntry.id }}">
          <h3>{{ timeEntry.description }}</h3>
        </router-link>
        <div>{{timeEntry.projectName}}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <TrackingBarTimer class="pa-2"/>
      <v-spacer></v-spacer>
      <v-btn flat color="error" @click="stopTimeEntry">stop</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import {mapGetters, mapActions } from "vuex";
  // TODO: Move TrackingBarTimer to shared folder
  import TrackingBarTimer from "../tracking-bar/TrackingBarTimer";
  export default {
    components: {
      TrackingBarTimer
    },
    computed: {
      ...mapGetters({
        timeEntry: "timers/activeTimeEntry"
      })
    },
    methods: {
      ...mapActions({
        updateTimeEntry: "timers/updateTimeEntry"
      }),
      stopTimeEntry() {
        this.updateTimeEntry({...this.timeEntry, stoppedAt: new Date().toISOString()})
      }
    }
  }
</script>
