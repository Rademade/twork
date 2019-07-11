import Vue from 'vue'
import Router from 'vue-router'
import LandingLayout from '@/core/components/LandingLayout'
import NotFound from '@/core/components/NotFound'

import { HOME_ROUTES } from "@/modules/home/router";
import { SIGN_ROUTES } from "@/modules/sign/router";
import APP_ROUTE from "@/modules/app/router";

Vue.use(Router)

const ROUTES = [
  {
    path: '/',
    component: LandingLayout,
    children: [
      SIGN_ROUTES,
      HOME_ROUTES
    ]
  },
  {
    path: '*',
    component: NotFound
  },
  APP_ROUTE
]

console.log(ROUTES);

const router = new Router({
  mode: 'history',
  routes: ROUTES
})

export default router
