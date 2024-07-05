import axios from 'axios'
import { useAuth } from '@/stores/auth.js'

const axiosPlugin = {
  install: (app) => {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'http://parking_app.test/api/v1'

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const auth = useAuth()
          auth.destroyTokenAndRedirectTo('register')
        }
        return Promise.reject(error)
      }
    )

    if (localStorage.getItem('access_token')) {
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${localStorage.getItem('access_token')}`
    }

    app.config.globalProperties.$axios = axios
  }
}

export default axiosPlugin
