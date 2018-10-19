import Vue from 'vue'
import Vuex from 'vuex'
import timersMobile from './modules/timer-mobile/store'
import timersDesktop from './modules/timer-desktop/store'
import projects from './modules/projects/store'
import reports from './modules/reports/store/store'
import deviceHelper from '@/core/services/deviceHelper';

Vue.use(Vuex);

const timers = deviceHelper.isMobile() ? timersMobile : timersDesktop

export default new Vuex.Store({
  modules: {
    timers,
    projects,
    reports
  },
  strict: true
})
