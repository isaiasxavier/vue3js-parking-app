import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth.js'
import axios from 'axios'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'

export const useLogin = defineStore('login', () => {
  const auth = useAuth()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const form = reactive({
    email: '',
    password: '',
    remember: false
  })

  function resetForm() {
    form.email = ''
    form.password = ''
    form.remember = false

    cleanErrors()
  }

  async function handleSubmit() {
    startLoading()
    cleanErrors()

    try {
      const response = await axios.post('auth/login', form)
      auth.login(response.data.access_token)
    } catch (error) {
      setErrors422(error.response)
    } finally {
      form.password = ''
      stopLoading()
    }
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
