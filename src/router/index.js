import { createRouter, createWebHistory } from 'vue-router'

function auth(to, from, next) {
  if (!localStorage.getItem('access_token')) {
    return next({ name: 'login' })
  }

  next()
}

function guest(to, from, next) {
  if (localStorage.getItem('access_token')) {
    return next({ name: 'vehicles.index' })
  }

  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'zone',
      component: () => import('@/views/Zone/IndexView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import('@/views/Auth/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile.edit',
      beforeEnter: auth,
      component: () => import('@/views/Profile/EditView.vue')
    },
    {
      path: '/profile/change-password',
      name: 'profile.change-password',
      beforeEnter: auth,
      component: () => import('@/views/Profile/ChangePasswordView.vue')
    },
    {
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: () => import('@/views/Vehicle/IndexView.vue')
    },
    {
      path: '/vehicles/create',
      name: 'vehicles.create',
      beforeEnter: auth,
      component: () => import('@/views/Vehicle/CreateView.vue')
    },
    {
      path: '/vehicles/:id/edit',
      name: 'vehicles.edit',
      beforeEnter: auth,
      component: () => import('@/views/Vehicle/EditView.vue')
    },
    {
      path: '/parkings/active',
      name: 'parkings.active',
      beforeEnter: auth,
      component: () => import('@/views/Parking/ActiveParking.vue')
    },
    {
      path: '/parkings/new',
      name: 'parkings.create',
      beforeEnter: auth,
      component: () => import('@/views/Parking/OrderParking.vue')
    }
  ]
})

export default router
