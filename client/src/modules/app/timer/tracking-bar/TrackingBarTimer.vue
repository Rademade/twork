<template>
  <input class="timer__time" v-model="durationFormatted" readonly/>
</template>

<script>
  export default {
    name: 'TrackingBarTimer',
    data: function () {
      return {
        interval: null,
        duration: this.$moment.duration(0),
        TICK_INTERVAL: 500
      }
    },
    mounted: function() {
      this.interval = setInterval(this.updateClocksDuration, this.TICK_INTERVAL);
    },
    destroyed: function() {
      clearInterval(this.interval);
    },
    computed: {
      CLOCK_INTERVAL: function() {
        return 1000;
      },
      durationFormatted: function() {
        return this.duration.format("hh:mm:ss", { trim: false });
      },
      startedAt() {
        return this.$store.getters["timers/activeTimeEntry"].startedAt;
      }
    },
    methods: {
      updateClocksDuration() {
        if (this.startedAt) {
          const currentTime = this.$moment();
          const startedAtMoment = this.$moment(this.startedAt)
          this.duration = this.$moment.duration(currentTime - startedAtMoment, "milliseconds");
        } else {
          this.duration = this.$moment.duration(0);
        }
      }
    }
  }
</script>
