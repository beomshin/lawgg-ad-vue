import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "Home" */ '../views/LoginPage')
  },
  {
    path: '/lawfirm',
    name: 'LawFirmPage',
    component: () => import('../views/lawFirm/LawFirmPage')
  },
  {
    path: '/lawfirm/enroll',
    name: 'LawFirmEnrollPage',
    component: () => import('../views/lawFirm/LawFirmEnrollPage')
  },
  {
    path: '/lawfirm/update',
    name: 'LawFirmEnrollPage',
    component: () => import('../views/lawFirm/LawFirmDetailPage')
  },
  {
    path: '/lawfirm/update2',
    name: 'LawFirmDetailPage2',
    component: () => import('../views/lawFirm/LawFirmDetailPage2')
  },
  {
    path: '/position',
    name: 'BoardPage',
    component: () => import('../views/position/BoardPage')
  },
  {
    path: '/position/detail',
    name: 'BoardDetailPage',
    component: () => import('../views/position/BoardDetailPage')
  },
  {
    path: '/position/notice',
    name: 'BoardNoticePage',
    component: () => import('../views/position/BoardNoticePage')
  },
  {
    path: '/trial',
    name: 'TrialPage',
    component: () => import('../views/trial/TrialPage')
  },
  {
    path: '/trial/detail',
    name: 'TrialDetailPage',
    component: () => import('../views/trial/TrialDetailPage')
  },
  {
    path: '/trial/notice',
    name: 'TrialNoticePage',
    component: () => import('../views/trial/TrialNoticePage')
  },
  {
    path: '/user',
    name: 'UserPage',
    component: () => import('../views/user/UserPage')
  },
  {
    path: '/user/detail',
    name: 'UserDetailPage',
    component: () => import('../views/user/UserDetailPage')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
    next()
})

export default router
