import TimerLayout from './TimerLayout';
import TimerList from "./TimerList";
import TimerItem from "./TimerItem";

export const TIMER_MOBILE_ROUTES = {
  path: '/timer',
  component: TimerLayout,
  name: 'timer',
  children: [
    {
      path: '',
      component: TimerList,
      name: 'timer-list',
    },
    {
      path: ':id',
      name: 'TimerItem',
      component: TimerItem
    },

  ]
};
