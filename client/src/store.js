import Vue from 'vue'
import Vuex from 'vuex'
import appStores from "./modules/app/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...appStores
  },
  strict: true
})
