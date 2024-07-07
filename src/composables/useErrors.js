import { reactive } from 'vue'

export function useErrors() {
  const errors = reactive({})

  function cleanErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
  }

  function setErrors422(errorResponse = null) {
    if (errorResponse && errorResponse.status === 422) {
      Object.assign(errors, errorResponse.data.errors)
    }
  }

  return { errors, cleanErrors, setErrors422 }
}
