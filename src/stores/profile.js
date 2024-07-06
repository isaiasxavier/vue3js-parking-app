import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfile = defineStore('profile', () => {
  const errors = reactive({})
  const status = ref('')
  const loading = ref(false)
  const form = reactive({
    name: '',
    email: ''
  })

  function resetForm() {
    form.name = ''
    form.email = ''

    status.value = ''

    for (const key in errors) {
      delete errors[key]
    }
  }

  function fetchProfile() {
    return axios.get('auth/profile').then((response) => {
      form.name = response.data.name
      form.email = response.data.email
    })
  }

  async function updateProfile() {
    loading.value = true

    for (const key in errors) {
      delete errors[key]
    }

    status.value = ''

    try {
      const response = await axios.put('auth/profile', form)
      form.name = response.data.name
      form.email = response.data.email
      status.value = 'Profile has been updated.'
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
    } finally {
      loading.value = false
    }
  }

  return { form, loading, errors, resetForm, status, fetchProfile, updateProfile }
})
