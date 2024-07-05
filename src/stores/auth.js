import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuth = defineStore('Auth', () => {
  const router = useRouter()
  const accessToken = useStorage('access_token', '')
  const check = computed(() => !!accessToken.value)

  function setAccessToken(value) {
    accessToken.value = value
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  function login(accessToken) {
    setAccessToken(accessToken)

    router.push({ name: 'vehicles.index' })
  }

  function destroyTokenAndRedirectTo(routeName) {
    setAccessToken(null)
    router.push({ name: routeName })
  }

  async function logout() {
    return axios.post('auth/logout').finally(() => {
      destroyTokenAndRedirectTo('register')
    })
  }

  return { login, logout, check, destroyTokenAndRedirectTo }
})
