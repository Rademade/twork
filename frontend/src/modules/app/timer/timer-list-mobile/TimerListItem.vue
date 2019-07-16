<template>
  <div>
    <v-list-tile
        route
        :key="timeEntry.description"
        avatar
        ripple
      >
        <v-list-tile-action v-if="timeEntry.unsynced">
          <v-icon color="red">warning</v-icon>
        </v-list-tile-action>
        <v-list-tile-content ref="timeEntryContent" @click="$router.push({name: 'timer-item', params: { id: timeEntry.id }})">
          <v-list-tile-title >
            <router-link :to="{ name: 'timer-item', params: { id: timeEntry.id }}" class="grey--text text--darken-4">
              {{ timeEntry.description }}
            </router-link>
          </v-list-tile-title>
          <div class="grey--text darken-1">{{ timeEntry.projectName }}</div>
        </v-list-tile-content>
        <div class="font-weight-bold px=1">{{ timeEntry.getDurationText() }} </div>
        <v-list-tile-action>
          <v-btn  flat icon color="primary" @click.prevent="restartTimeEntry">
            <v-icon color="grey lighten-1"> autorenew </v-icon>
          </v-btn>
          <v-btn  flat icon color="primary" @click.prevent="destroy(timeEntry.id)">
            <v-icon color="grey lighten-1"> delete </v-icon>
          </v-btn>


        </v-list-tile-action>
      </v-list-tile>
  </div>
</template>

<script>
import Hammer from "hammerjs";
import { mapActions } from 'vuex';
export default {
  props: ['timeEntry'],
  data() {
    return {
      swipeManager: null,
    }
  },
  mounted() {
    // TODO: Extract to directive
    this.initTimeEntrySwipe();
  },
  methods: {
    ...mapActions({
      deleteTimeEntry: "timers/deleteTimeEntry",
      createTimeEntry: "timers/createTimeEntry"
    }),
    restartTimeEntry() {
      this.createTimeEntry({...this.timeEntry, id: null, stoppedAt: null, startedAt: new Date().toISOString()})
    },
    destroy(timeEntryId) { this.deleteTimeEntry(timeEntryId) },
    initTimeEntrySwipe() {
      const swipeArea = this.$refs.timeEntryContent;
      this.swipeManager = new Hammer.Manager(this.$el);
      let swipe = new Hammer.Swipe();
      this.swipeManager.add(swipe);
      let deltaX = 0;
      const initialTranslate3d = 'translate3d(0px, 0, 0)';
      const deleteTranslate3d = 'translate3d(150px, 0, 0)';
      this.swipeManager.on('swipe', (e) => {
        deltaX = deltaX + e.deltaX;
        let direction = e.offsetDirection;
        if (direction === 4 || direction === 2) {
          if (deltaX > 150) {
            swipeArea.style.transform = deleteTranslate3d;
            this.deleteTimeEntry(this.timeEntry.id);
          } else {
            setTimeout(() => {
              swipeArea.style.transform = initialTranslate3d;
            }, 100);
          }
        }
      });
    }
  }
}

</script>
