<template>
  <v-layout row wrap>
    <v-flex lg12>
      <v-card class="timer">
        <v-layout row wrap>
          <v-flex lg7 md6 xs12 pa-2>
            <v-text-field
              :value="activeTimeEntry.description"
              placeholder="Your task description goes here"
              ref="descriptionInput"
              @blur="changeDescription"
              @keyup.enter.prevent="onDescriptionSubmit()"
            >
            </v-text-field>
          </v-flex>
          <v-flex lg2 md6 xs12 pa-2>
            <TimerProjectSelect :initialProject="activeTimeEntry.projectId" @projectChanged="onProjectChanged" />
          </v-flex>
          <v-flex lg-3 pa-2>
            <v-layout>
              <v-flex lg2 pt-2>
                <BillableButton
                  :initialBillableState="activeTimeEntry.billable"
                  v-on:billableChanged="onBillableStateChanged"
                />
              </v-flex>
              <v-flex lg4 pt-4>
                <DateTimeRangePicker v-on:rangeChanged="onTimeRangeChanged" :startedAt="activeTimeEntry.startedAt" rangeValidationStrategy="allowEmptyEnd">
                  <TrackingBarTimer slot="activator"/>
                </DateTimeRangePicker>
              </v-flex>
              <v-flex lg3>
                <div>
                  <v-btn v-if="!isTimerStarted" fab dark color="teal" v-on:click="onStartButtonClick">
                    <v-icon dark>play_arrow</v-icon>
                  </v-btn>
                  <v-btn v-if="isTimerStarted" fab dark color="pink" v-on:click="onStopButtonClick">
                    <v-icon dark>stop</v-icon>
                  </v-btn>
                </div>
              </v-flex>
              <v-flex lg1 pt-2 pl-3>
                <v-btn flat icon color="grey" v-on:click="deleteActiveTimer"><v-icon>delete</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import TimerProjectSelect from "../shared/TimerProjectSelect";
  import TrackingBarTimer from "./TrackingBarTimer";
  import BillableButton from './../shared/BillableButton';
  import DateTimeRangePicker from './../shared/DateTimeRangePicker';
  import { mapGetters, mapActions, mapMutations } from "vuex";
  /* eslint-disable */
    import Trash from "@/assets/trash.svg";
  /* eslint-enable */


  export default {
    name: 'TrackingBar',
    components: {
      TrackingBarTimer,
      TimerProjectSelect,
      BillableButton,
      DateTimeRangePicker
    },
    data() {
      return {
        localBillable: null,
        localProjectId: null,
      }
    },
    computed: {
      ...mapGetters({
        'activeTimeEntry': 'timers/activeTimeEntry'
      }),
      isTimerStarted: function() { return this.activeTimeEntry && this.activeTimeEntry.startedAt }
    },
    methods: {
      ...mapMutations({
        updateTimeEntryOnlyLocaly: 'timers/updateTimeEntry'
      }),
      ...mapActions({
        deleteTimeEntry: "timers/deleteTimeEntry",
        start: "timers/createTimeEntry",
        updateTimeEntryOnServer: "timers/updateTimeEntry"
      }),
      updateTimeEntry(updatedTimeEntry) {
        if (this.isTimerStarted) {
          this.updateTimeEntryOnServer(updatedTimeEntry)
        } else {
          this.updateTimeEntryOnlyLocaly(updatedTimeEntry);
        }
      },
      changeDescription(event) {
        const updatedTimeEntry = { ...this.activeTimeEntry, description: event.target.value };
        this.updateTimeEntry(updatedTimeEntry)
      },
      onDescriptionSubmit () {
        if (!this.isTimerStarted) {
          const updatedTimeEntry = { ...this.activeTimeEntry, startedAt: new Date().toISOString() }
          this.start(updatedTimeEntry);
        }
      },
      onProjectChanged(projectId) {
        const updatedTimeEntry = { ...this.activeTimeEntry, projectId: projectId }
        this.updateTimeEntry(updatedTimeEntry);
      },
      onBillableStateChanged(isBillable) {
        const updatedTimeEntry = { ...this.activeTimeEntry, billable: isBillable }
        this.updateTimeEntry(updatedTimeEntry);
      },
      onTimeRangeChanged({startedAt, endedAt}) {
        const updatedTimeEntry = { ...this.activeTimeEntry, startedAt: startedAt, stoppedAt: endedAt };
        if (this.isTimerStarted) {
          this.updateTimeEntry(updatedTimeEntry)
        } else {
          this.start(updatedTimeEntry)
        }
      },
      onStartButtonClick () {
         const updatedTimeEntry = { ...this.activeTimeEntry, startedAt: new Date().toISOString() }
        this.start(updatedTimeEntry);
      },
      onStopButtonClick() {
        const updatedTimeEntry = { ...this.activeTimeEntry, stoppedAt: new Date().toISOString() }
        this.updateTimeEntry(updatedTimeEntry);
      },
      deleteActiveTimer() {
        this.deleteTimeEntry(this.activeTimeEntry.id)
      }
    }
  }
</script>

