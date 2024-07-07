import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStatus } from '@/composables/useStatus.js'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import axios from 'axios'

export const useProfile = defineStore('profile', () => {
  const { status, setStatus } = useStatus()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const form = reactive({
    name: '',
    email: ''
  })

  function resetForm() {
    form.name = ''
    form.email = ''
    status.value = ''
    cleanErrors()
  }

  function fetchProfile() {
    return axios.get('auth/profile').then((response) => {
      form.name = response.data.name
      form.email = response.data.email
    })
  }

  async function updateProfile() {
    startLoading()
    status.value = ''
    cleanErrors()

    try {
      const response = await axios.put('auth/profile', form)
      form.name = response.data.name
      form.email = response.data.email
      setStatus('Profile has been updated.')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      stopLoading()
    }
  }

  return { form, status, errors, loading, resetForm, fetchProfile, updateProfile }
})
