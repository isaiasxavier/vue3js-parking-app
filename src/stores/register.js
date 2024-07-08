import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth.js'
import axios from 'axios'
import { useLoading } from '@/composables/useLoading.js'
import { useErrors } from '@/composables/useErrors.js'

export const useRegister = defineStore('register', () => {
  const auth = useAuth()
  const { loading, startLoading, stopLoading } = useLoading()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''
    cleanErrors()
  }

  async function handleSubmit() {
    startLoading()
    cleanErrors()
    try {
      const response = await axios.post('auth/register', form)
      await auth.login(response.data.access_token, 'register')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      form.password = ''
      form.password_confirmation = ''
      stopLoading()
    }
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
