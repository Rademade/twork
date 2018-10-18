<template>
  <v-layout>
    <v-flex md6 sm6 xs12>
      <v-menu
          :close-on-content-click="false"
          :return-value.sync="dateRange.start"
          :nudge-right="40"
          v-model="isStartDateMenuOpened"
          transition="scale-transition"
          ref="startDateMenu"
          min-width="290px"
          full-width
          offset-y
          lazy
        >
          <v-text-field
            v-model="dateRange.start"
            prepend-icon="event"
            slot="activator"
            label="Date"
            readonly
          />
          <v-date-picker
            v-model="dateRange.start"
            no-title
            scrollable
            @change="$refs.startDateMenu.save(dateRange.start)"
          />
      </v-menu>
    </v-flex>
    <v-flex md6 sm6 xs12>
      <v-menu
          :close-on-content-click="false"
          :return-value.sync="dateRange.end"
          :nudge-right="40"
          v-model="isEndDateMenuOpened"
          transition="scale-transition"
          ref="endDateMenu"
          min-width="290px"
          full-width
          offset-y
          lazy
        >
          <v-text-field
            v-model="dateRange.end"
            prepend-icon="event"
            slot="activator"
            label="Date"
            readonly
          />
          <v-date-picker
            v-model="dateRange.end"
            no-title
            scrollable
            @change="$refs.endDateMenu.save(dateRange.end)"
          />
      </v-menu>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ["dateRange"],
    data() {
      return {
        isStartDateMenuOpened: true,
        isEndDateMenuOpened: true,
      }
    }
  }
</script>