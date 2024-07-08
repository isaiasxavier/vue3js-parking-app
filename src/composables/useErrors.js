import { reactive } from 'vue'
import { useStatus } from '@/composables/useStatus.js'

export function useErrors() {
  const errors = reactive({})
  const { setStatus } = useStatus()

  function cleanErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
  }

  function setErrors422(errorResponse = null) {
    if (errorResponse && errorResponse.status === 422) {
      Object.assign(errors, errorResponse.data.errors)
    }
  }

  function setErrors404(errorResponse = null) {
    if (errorResponse && errorResponse.status === 404) {
      setStatus('Vehicle not found!')
    }
  }

  return { errors, cleanErrors, setErrors422, setErrors404 }
}
