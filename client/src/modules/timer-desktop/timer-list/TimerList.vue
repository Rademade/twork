<template>
  <div class="timer-box">
    <ul
      :key="index"
      v-for="(timeEntryGroup, date, index) in timeEntryGroups"
      class="timer-list"
    >
      <li class="timer-list__day-sum">
        <span class="timer-list__day">{{ date }}</span>
        <span class="timer-list__sum">
          {{ totalGroupSpended(timeEntryGroup) }}
        </span>
      </li>

      <TimerItem
        :key="timeEntry.id"
        v-bind:time-entry="timeEntry"
        v-for="timeEntry in timeEntryGroup"
      />
    </ul>
  </div>
</template>

<script>
  import TimerItem from "./timer-item/TimerItem";
  import { mapGetters } from "vuex";

  export default {
    components: {
      TimerItem
    },
    name: 'TimerList',
    computed: {
      ...mapGetters({
        'stoppedTimeEntries': 'timers/stoppedTimeEntries'
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
      totalGroupSpended(timerEntryGroup) {
        let total = this.$_.sumBy(timerEntryGroup, timeEntry => timeEntry.duration())
        return this.$moment.duration(total).format("hh:mm:ss", { trim: false });
      }
    }
  }
</script>


<style lang="css" scoped>
  .timer-list {
    margin-bottom: 25px;
    background-color: #fff;
  }
  .timer-list__day-sum {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-weight: bold;
    line-height: 50px;
  }
</style>