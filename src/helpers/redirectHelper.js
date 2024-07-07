import router from '@/router/index.js'

export function redirectTo(routeName, params = {}, query = {}) {
  router.push({ name: routeName, params, query })
}
