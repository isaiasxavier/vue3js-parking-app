import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = useStorage('access_token', '')
  const check = computed(() => !!accessToken.value)

  function setAccessToken(value) {
    accessToken.value = value
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  function login(accessToken, origin = 'login') {
    setAccessToken(accessToken)

    if (origin === 'login') {
      return router.push({ name: 'parkings.active' })
    } else if (origin === 'register') {
      return router.push({ name: 'vehicles.index' })
    }
  }

  function destroyTokenAndRedirectTo(routeName = 'login') {
    setAccessToken(null)
    router.push({ name: routeName })
  }

  async function logout() {
    return axios.post('auth/logout').finally(() => {
      destroyTokenAndRedirectTo('login')
    })
  }

  return { login, logout, check, destroyTokenAndRedirectTo }
})
