import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/core/components/Layout'
import AppLayout from '@/core/components/AppLayout'
import NotFound from '@/core/components/NotFound'
import requireAuth from "@/core/services/requireAuth";

import { HOME_ROUTES } from '@/modules/home/router'
import { SIGN_ROUTES } from '@/modules/sign/router'
import { TIMER_MOBILE_ROUTES } from '@/modules/timer-mobile/router'
import { PROJECT_ROUTES } from '@/modules/projects/router'
import { REPORT_ROUTES } from '@/modules/reports/router'

import configs from '@/configs'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
      redirect: 'timer'
    },
    {
      path: '/',
      component: Layout,
      children: [
        SIGN_ROUTES,
        HOME_ROUTES
      ]
    },
    {
      path: '/apidoc',
      redirect: () => { window.location.href = configs.apiDocUrl }
    },
    {
      path: '/app',
      name: 'app',
      component: AppLayout,
      beforeEnter: requireAuth,
      children: [
        HOME_ROUTES,
        TIMER_MOBILE_ROUTES,
        PROJECT_ROUTES,
        REPORT_ROUTES
      ]
    }
  ]
})

export default router
