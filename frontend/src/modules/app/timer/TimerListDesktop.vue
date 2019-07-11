<template>
  <v-layout row wrap>
    <v-flex lg12 pa-1> <TrackingBar/></v-flex>
    <v-flex lg12 pa-1> <TimerList/></v-flex>
  </v-layout>
</template>

<script>
  import TimerList from "./timer-list-desktop/TimerList"
  import TrackingBar from "./tracking-bar/TrackingBar";

  export default {
    name: 'Timer',
    components: {
      TimerList,
      TrackingBar
    }
  }
</script>
