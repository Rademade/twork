import AppLayout from './AppLayout';
import requireAuth from "@/core/services/requireAuth";

import TIMER_ROUTES from './timer/router'
import PROJECT_ROUTES from './projects/router'
import REPORT_ROUTES from "./reports/router";

export default {
  path: '/app',
  component: AppLayout,
  beforeEnter: requireAuth,
  children: [
    ...PROJECT_ROUTES,
    ...REPORT_ROUTES,
    ...TIMER_ROUTES,
  ],
};
