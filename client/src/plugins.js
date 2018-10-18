import store              from './store';
import * as lodash        from "lodash";
import moment             from "moment";

let storePlugin = {
  store,
  install(Vue) {
    Vue.prototype.$store = store;
  }
};

let lodashPlugin = {
  lodash,
  install(Vue) {
    Vue.prototype.$_ = lodash;
  }
};

let momentPlugin = {
  moment,
  install(Vue) {
    Vue.prototype.$moment = moment;
  }
};

export { storePlugin, lodashPlugin, momentPlugin };
