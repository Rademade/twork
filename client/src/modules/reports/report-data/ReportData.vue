<template>
  <div>
    <v-layout raw wrap>
      <v-flex xs3 px-2>
        <v-select
          :items="groupOptions"
          v-model="reportGrouping.groupBy"
          item-text="title"
          item-value="value"
          label="Group by"
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex xs3 px-2>
        <v-select
          :items="subgroupOptions"
          v-model="reportGrouping.subgroupBy"
          item-text="title"
          item-value="value"
          label="Subgroup by"
          max-height="400"
        ></v-select>
      </v-flex>
    </v-layout>
    <div>{{JSON.stringify(reportData)}}</div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        groupOptions: [
          { title: "Project", value: "project" },
          { title: "User", value: "user" }
        ],
        subgroupOptions: [
          { title: "Time Entry", value: "time_entry"}
        ]
      }
    },
    computed: {
      ...mapGetters({
        reportData: "reports/reportData",
      }),
      reportGrouping() {
        return this.$_.cloneDeep(this.$store.getters["reports/reportGrouping"])
      }
    }
  }
</script>
