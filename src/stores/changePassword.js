import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useStatus } from '@/composables/useStatus.js'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import axios from 'axios'

export const useChangePassword = defineStore('change-password', () => {
  const { status, setStatus } = useStatus()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
    status.value = ''
    cleanErrors()
  }

  async function updatePassword() {
    startLoading()
    status.value = ''
    cleanErrors()

    try {
      const response = await axios.put('auth/password', form)
      form.current_password = response.data.current_password
      form.password = response.data.password
      form.password_confirmation = response.data.password_confirmation
      setStatus('Password has been updated.')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      form.current_password = ''
      form.password = ''
      form.password_confirmation = ''

      stopLoading()
    }
  }

  return { form, loading, errors, status, resetForm, updatePassword }
})
