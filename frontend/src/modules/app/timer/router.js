import TimerListDesktop from './TimerListDesktop';
import TimerListMobile from './TimerListMobile';
import TimerMobile from './TimerMobile';
import deviceHelper from "@/core/services/deviceHelper";

let TIMER_ROUTES;

if (deviceHelper.isMobile()) {
  TIMER_ROUTES = [
    {
      path: 'timer',
      component: TimerListMobile,
      name: 'timer-list',
    },
    {
      path: 'timer/:id',
      name: 'timer-item',
      component: TimerMobile
    }
  ]
} else {
  TIMER_ROUTES = [
    {
      path: 'timer',
      component: TimerListDesktop,
      name: 'timer-list'
    }
  ]
}
export default TIMER_ROUTES;
