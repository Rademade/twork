<template>
  <v-layout row wrap>
    <v-flex sm12>
      <form v-if="timeEntry">
        <v-text-field
          v-model="description"
          label="Description"
        ></v-text-field>
        <v-autocomplete
          :items="projects"
          v-model="projectId"
          item-text="name"
          item-value="id"
          :menu-props="'auto'"
          :clearable="true"
          placeholder="No project"
        >
        </v-autocomplete>
        <v-checkbox
          v-model="billable"
          label="Billable"
          type="checkbox"
        ></v-checkbox>
          <v-dialog
          ref="dateDialog"
          v-model="datePickerModal"
          :return-value.sync="startDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="startDate"
            label="Timer date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            v-if="datePickerModal"
            v-model="startDate"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="datePickerModal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dateDialog.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="startedAtDialog"
          v-model="startPickerModal"
          :return-value.sync="startTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="startTime"
            label="Start time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="startPickerModal"
            v-model="startTime"
            full-width
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="startPickerModal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.startedAtDialog.save(startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="stoppedAtDialog"
          v-model="stopPickerModal"
          :return-value.sync="stopTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="stopTime"
            label="Stop time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="stopPickerModal"
            v-model="stopTime"
            full-width
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="stopPickerModal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.stoppedAtDialog.save(stopTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-btn color="primary" @click="submit">submit</v-btn>
        <v-btn router-link :to="{ name: 'timer-list' }">back</v-btn>
      </form>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      <v-snackbar
        v-model="snackbar"
        :bottom="true"
        :timeout="3000"
      >
        Time entry saved
        <v-btn color="pink" flat @click="snackbar=false"> Close </v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Vue from "vue";

  export default {
    data: () => {
      return {
        snackbar: false,
        description: '',
        projectId: '',
        workspaceId: '',
        startTime: '',
        stopTime: '',
        startDate: '',
        billable: false,
        startPickerModal: false,
        stopPickerModal: false,
        datePickerModal: false
      }
    },
    computed: {
      ...mapGetters({
        projects: 'projects/projects',
        timeEntry: 'timers/currentTimeEntry'
      })
    },
    created() {
      this.fetchTimeEntryFromRoute();
    },
    watch: {
      '$route': 'fetchTimeEntryFromRoute',
      'timeEntry': function(newTimeEntry, oldTimeEntry) {
        if (newTimeEntry) {
          this.startTime = newTimeEntry.startedAtTime24() || this.$moment().format('HH:mm');
          this.startDate = newTimeEntry.startDate() || this.$moment().format('YYYY-MM-DD');
          this.stopTime = newTimeEntry.stoppedAtTime24();
          this.billable = newTimeEntry.billable;
          this.description = newTimeEntry.description;
          this.projectId = newTimeEntry.projectId;
          this.workspaceId = newTimeEntry.workspaceId;
        }
      }
    },
    methods: {
      ...mapActions({
        fetchCurrentTimeEntry: 'timers/fetchCurrentTimeEntry',
        updateTimeEntry: 'timers/updateTimeEntry'
      }),
      fetchTimeEntryFromRoute() { this.fetchCurrentTimeEntry(this.$route.params.id) },
      submit() {
        this.updateTimeEntry({
            id: this.timeEntry.id,
            description: this.description,
            billable: this.billable,
            projectId: this.projectId,
            startedAt: this.$moment(this.startDate + ' ' + this.startTime).toISOString(),
            stoppedAt: (this.stopTime == '') ? null :  this.$moment(this.startDate + ' ' + this.stopTime).toISOString(),
            workspaceId: this.workspaceId
        }).then(_ => this.snackbar = true)
      }
    }
  }
</script>
