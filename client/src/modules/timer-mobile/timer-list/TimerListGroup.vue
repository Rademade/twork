<template>
  <v-list two-line subheader>
    <v-subheader>{{ timeEntriesDate }}</v-subheader>
    <template v-for="(timeEntry, index) in timeEntries" class="time-entry">
      <TimerListItem :timeEntry="timeEntry" :key="timeEntry.id"></TimerListItem>
      <v-divider
        v-if="index + 1 < timeEntries.length"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
  import TimerListItem from "./TimerListItem";
  export default {
    components: {
      TimerListItem
    },
    props: [
      'timeEntriesDate',
      'timeEntries'
    ]
  }
</script>
