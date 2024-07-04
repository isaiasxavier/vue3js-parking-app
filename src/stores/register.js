import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRegister = defineStore('register', () => {
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
    for (const key in errors) {
      delete errors[key]
    }

    try {
      const response = await window.axios.post('auth/register', form)
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
    } finally {
      form.password = ''
      form.password_confirmation = ''
    }
  }

  return { form, errors, resetForm, handleSubmit }
})
