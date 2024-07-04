import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth.js'

export const useRegister = defineStore('register', () => {
  const auth = useAuth()
  const loading = ref(false)
  const errors = reactive({})
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
      const response = await window.axios.post('auth/register', form)
      auth.login(response.data.access_token)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
    } finally {
      form.password = ''
      form.password_confirmation = ''
      loading.value = false
    }
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
