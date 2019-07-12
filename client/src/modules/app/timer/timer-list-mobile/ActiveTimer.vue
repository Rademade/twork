<template>
  <v-card class="elevation-4 mb-4" fixed>
    <v-card-title primary-title>
      <div>
        <router-link :to="{ name: 'timer-item', params: { id: timeEntry.id }}">
          <h3 class="title primary--text">{{ timeEntry.description }}</h3>
        </router-link>
        <div class="subheading grey--text">{{timeEntry.projectName}}</div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <BillableButton :initialBillableState="timeEntry.billable" v-on:billableChanged="onBillableStateChanged"/>
      <TrackingBarTimer class="pa-2"/>
      <v-spacer></v-spacer>
      <v-icon color="red darken-4" class="pr-2" @click="stopTimeEntry">fas fa-stop-circle</v-icon>
    </v-card-actions>
  </v-card>
</template>
<script>
  import {mapGetters, mapActions } from "vuex";
  // TODO: Move TrackingBarTimer to shared folder
  import TrackingBarTimer from "../tracking-bar/TrackingBarTimer";
  import BillableButton from "../shared/BillableButton";

  export default {
    components: {
      TrackingBarTimer,
      BillableButton
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
