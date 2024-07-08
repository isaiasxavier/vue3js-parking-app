import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import { useStatus } from '@/composables/useStatus.js'
import axios from 'axios'
import { redirectTo } from '@/helpers/redirectHelper.js'

export const useParking = defineStore('parking', () => {
  const { errors, cleanErrors, setErrors422, setErrors404 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const { status, setStatus } = useStatus()
  const parkings = ref([])
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
    } catch (error) {
      setErrors422(error.response)
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
      await axios.put(`parkings/${parking.id}`, form)
      setStatus('Parking has been stopped!')
      redirectTo('parkings.active')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      stopLoading()
      await getActiveParking()
    }
  }

  async function getActiveParking() {
    try {
      const response = await axios.get('parkings')
      parkings.value = response.data.data
    } catch (error) {
      setErrors404(error.response)
    }
  }

  return {
    form,
    parkings,
    status,
    loading,
    errors,
    resetForm,
    startParking,
    stopParking,
    getActiveParking
  }
})
