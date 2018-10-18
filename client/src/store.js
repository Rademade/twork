import Vue from 'vue'
import Vuex from 'vuex'
import timers from './modules/timer-mobile/store'
import projects from './modules/projects/store'
import reports from './modules/reports/store/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timers,
    projects,
    reports
  },
  strict: true
})
