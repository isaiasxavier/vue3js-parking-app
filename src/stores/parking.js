import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import { useStatus } from '@/composables/useStatus.js'
import axios from 'axios'
import { redirectTo } from '@/helpers/redirectHelper.js'

export const useParking = defineStore('parking', () => {
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const { status, setStatus } = useStatus()
  const parking = ref([])
  const form = reactive({
    vehicle_id: null,
    zone_id: null
  })

  function resetForm() {
    form.vehicle_id = null
    form.zone_id = null
    cleanErrors()
  }

  async function startParking() {
    cleanErrors()
    startLoading()
    try {
      await axios.post('parkings/start', form)
      setStatus('Parking has been started!')
      redirectTo('parkings.active')
    } catch (errors) {
      setErrors422(errors.response)
    } finally {
      form.vehicle_id = null
      form.zone_id = null
      stopLoading()
    }
  }

  async function stopParking(parking) {
    startLoading()
    cleanErrors()
    try {
      await axios.post(`parking/stop/${parking.id}`, form)
      setStatus('Parking has been stopped!')
      redirectTo('parkings.active')
    } catch (errors) {
      setErrors422(errors.response)
    } finally {
      form.vehicle_id = null
      form.zone_id = null
      stopLoading()
    }
  }

  return { form, parking, status, loading, errors, resetForm, startParking, stopParking }
})
