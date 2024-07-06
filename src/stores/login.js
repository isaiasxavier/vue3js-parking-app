import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth.js'
import axios from 'axios'

export const useLogin = defineStore('login', () => {
  const auth = useAuth()
  const errors = reactive({})
  const loading = ref(false)
  const form = reactive({
    email: '',
    password: '',
    remember: false
  })

  function resetForm() {
    form.email = ''
    form.password = ''
    form.remember = false

    for (const key in errors) {
      delete errors[key]
    }
  }

  async function handleSubmit() {
    if (loading.value) return

    loading.value = true
    for (const key in errors) {
      delete errors[key]
    }

    try {
      const response = await axios.post('auth/login', form)
      auth.login(response.data.access_token)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
    } finally {
      form.password = ''
      loading.value = false
    }
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
