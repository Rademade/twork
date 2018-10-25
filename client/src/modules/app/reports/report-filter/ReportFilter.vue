<template>
  <v-layout row wrap>
    <v-flex lg3 md3 xs12 px-2>
      <v-select
        :items="users"
        v-model="filter.team"
        item-text="name"
        item-value="id"
        label="Select"
        multiple
        autocomplete
        max-height="400"
        hint="Pick team"
        persistent-hint
      ></v-select>
    </v-flex>
    <v-flex lg3 md3 xs12 px-2>
       <v-select
        :items="projects"
        v-model="filter.projects"
        item-text="name"
        item-value="id"
        label="Select"
        multiple
        autocomplete
        max-height="400"
        hint="Pick project"
        persistent-hint
      ></v-select>
    </v-flex>
    <v-flex lg3 md5 xs12 px-2>
      <DateRangePicker :dateRange="filter.dateRange"/>
    </v-flex>
    <v-flex lg2>
      <v-select
        :items="billableOptions"
        v-model="filter.billable"
        item-text="name"
        item-value="value"
        label="Select"
        max-height="400"
        hint="Set billable"
        persistent-hint
      ></v-select>
    </v-flex>
    <v-flex lg1 md1 xs12>
      <v-btn color="info" @click="fetchSummaryReportWIthFilter(filter)">Apply</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  import DateRangePicker from "./DateRangePicker.vue"
  import { mapGetters, mapActions } from "vuex";
  export default {
    components: {
      DateRangePicker
    },
    data() {
      return {
        billableOptions: [
          { name: "Billable", value: true },
          { name: "Non-billable", value: false },
          { name: "Both", value: null }
        ]
      }
    },
    computed: {
      ...mapGetters({
        users: "reports/users",
        currentUser: "auth/currentUser",
        projects: "projects/projects"
      }),
      filter() {
        return this.$_.cloneDeep(this.$store.getters["reports/reportFilter"])
      }
    },
    created() {
      this.initDefaultFilterParams();
      this.fetchSummaryReportWIthFilter(this.filter);
    },
    methods: {
      ...mapActions({
        fetchSummaryReportWIthFilter: "reports/fetchSummaryReportWIthFilter"
      }),
      initDefaultFilterParams() {
        this.filter.team = [this.currentUser.id];
        this.filter.dateRange.start = this.$moment().startOf('isoWeek').format("YYYY-MM-DD");
        this.filter.dateRange.end = this.$moment().endOf('isoWeek').format("YYYY-MM-DD");
      }
    }
  }
</script>