import { defineStore } from 'pinia'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import { reactive } from 'vue'
import axios from 'axios'
import { redirectTo } from '@/helpers/redirectHelper.js'

export const useVehicle = defineStore('vehicles', () => {
  const { loading, startLoading, stopLoading } = useLoading()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const form = reactive({
    plate_number: ''
  })

  function resetForm() {
    form.plate_number = ''
    cleanErrors()
  }

  async function storeVehicle() {
    startLoading()
    cleanErrors()
    try {
      await axios.post('vehicles', form)
      form.plate_number = ''
      redirectTo('vehicles.index')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      form.plate_number = ''
      stopLoading()
    }
  }

  return { form, loading, errors, status, resetForm, storeVehicle }
})
