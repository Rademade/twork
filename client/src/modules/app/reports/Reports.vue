<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ReportFilter/>
    </v-flex>
    <v-divider></v-divider>
    <v-flex xs12 v-if="reportData">
      <ReportData/>
    </v-flex>
  </v-layout>
</template>
<script>
  import ReportFilter from "./report-filter/ReportFilter";
  import ReportData from "./report-data/ReportData";
  import { mapActions, mapGetters } from "vuex"
  export default {
    name: 'Reports',
    components: {
      ReportFilter,
      ReportData
    },
    computed: {
      ...mapGetters({
        reportData: "reports/reportData"
      })
    },
    methods: {
      ...mapActions({
        fetchUsers: "reports/fetchWorkspaceUsers"
      })
    },
    created() {
      this.fetchUsers()
    }
  }
</script>