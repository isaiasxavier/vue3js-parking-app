import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useChangePassword = defineStore('change-password', () => {
  const errors = reactive({})
  const status = ref('')
  const loading = ref(false)
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''

    for (const key in errors) {
      delete errors[key]
    }
  }

  async function updatePassword() {
    if (loading.value) return

    loading.value = true
    for (const key in errors) {
      delete errors[key]
    }

    try {
      const response = await axios.put('auth/password', form)
      form.current_password = response.data.current_password
      form.password = response.data.password
      form.password_confirmation = response.data.password_confirmation
      status.value = 'Password has been updated.'
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
    } finally {
      form.current_password = ''
      form.password = ''
      form.password_confirmation = ''

      loading.value = false
    }
  }

  return { form, loading, errors, resetForm, status, updatePassword }
})
