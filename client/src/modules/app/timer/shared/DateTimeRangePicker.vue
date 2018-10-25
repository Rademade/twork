<template>
  <v-menu
          :close-on-content-click="false"
          v-model="isTimeMenuOpened"
          full-width
          offset-y
          lazy
        >
        <div slot="activator">
          <slot name="activator"></slot>
        </div>

        <div class="timer-list__task-time-edit-menu" @keyup.enter.prevent="closeTimeMenu()">
          <v-layout row justify-space-between>
            <v-flex xs12 sm4>
              <v-text-field
                :rules="timeValidationRules"
                :error="!isTimeValid()"
                v-model="startedAtTime"
                label="start"
                type="time"
                step="1"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm4>
              <v-text-field
                :rules="timeValidationRules"
                :error="!isTimeValid()"
                v-model="endedAtTime"
                label="End"
                type="time"
                step="1"
              ></v-text-field>
            </v-flex>

        <v-flex xs12 sm4>
          <v-menu
            :close-on-content-click="false"
            :return-value.sync="date"
            :nudge-right="40"
            v-model="isDateMenuOpened"
            transition="scale-transition"
            ref="dateMenu"
            min-width="290px"
            full-width
            offset-y
            lazy
          >
            <v-text-field
              v-model="date"
              prepend-icon="event"
              slot="activator"
              label="Date"
              readonly
            />
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              @change="$refs.dateMenu.save(date)"
            />
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
  </v-menu>
</template>

<script>
  const ALLOW_EMPTY_BOTH_RVS = "allowEmptyBoth";
  const ALLOW_EMPTY_END_RVS = "allowEmptyEnd";
  const CHECK_BOTH_RVS = "checkBoth";
  import moment from "moment";

  export default {
    props: {
      startedAt: {
        default: moment().milliseconds(0).toISOString(),
        type: String
      },
      endedAt: {
        default: null,
        type: String
      },
      rangeValidationStrategy: {
        type: String,
        default: CHECK_BOTH_RVS,
        validator: function (value) {
          return [
           ALLOW_EMPTY_BOTH_RVS,
           ALLOW_EMPTY_END_RVS,
           CHECK_BOTH_RVS
          ].indexOf(value) !== -1
        }
      }
    },
    name: 'DateTimeRangePicker',
    data() {
      return {
        startedAtTime: this.startedAt && this.$moment(this.startedAt).format('HH:mm:ss') || this.$moment().format('HH:mm:ss'),
        endedAtTime: this.endedAt && this.$moment(this.endedAt).format('HH:mm:ss') || null,
        date: this.startedAt && this.$moment(this.startedAt).format('YYYY-MM-DD') || this.$moment().format('YYYY-MM-DD'),
        isTimeMenuOpened: false,
        isDateMenuOpened: false,
        timeValidationRules: [value => this.isTimeValid() || '']
      }
    },
    watch: {
      isTimeMenuOpened: function() {
        if (!this.isTimeMenuOpened && this.isTimeValid()) {
          const startedAt = this.prepareDate('startedAtTime');
          const endedAt = this.prepareDate('endedAtTime');
          let startedAtISO = startedAt ? startedAt.toISOString() : null
          let endedAtISO = endedAt ? endedAt.toISOString() : null
          if (this.startedAt == startedAtISO && this.endedAt == endedAtISO) {
            return;
          }
          this.$emit('rangeChanged', {
            startedAt: startedAt && startedAt.toISOString(),
            endedAt: endedAt && endedAt.toISOString()
          });
        }
      }
    },
    methods: {
      isTimeValid() {
        if (!!this.startedAtTime && !!this.endedAtTime) {
          return this.prepareDate('startedAtTime').isBefore(this.prepareDate('endedAtTime'))
        } else if (!!this.startedAtTime && this.rangeValidationStrategy == ALLOW_EMPTY_END_RVS) {
          return true;
        } else if (this.rangeValidationStrategy == ALLOW_EMPTY_BOTH_RVS) {
          return true;
        } else {
          return false;
        }
      },
      prepareDate(nameOfDateAttribute) {
        if(!this[nameOfDateAttribute]) {
          return null;
        } else {
          return this.$moment(new Date(this.date + ' ' + this[nameOfDateAttribute]))
        }
      },
      closeTimeMenu() {
        if (this.isTimeValid()) {
          this.isTimeMenuOpened = false;
        }
      }
    }
  }
</script>

<style scoped>
  .timer-list__task-time-edit-menu {
    background-color: #fafafa;
    padding: 8px 8px 0;
  }
</style>
