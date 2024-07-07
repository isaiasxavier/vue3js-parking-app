import { defineStore } from 'pinia'
import { useErrors } from '@/composables/useErrors.js'
import { useLoading } from '@/composables/useLoading.js'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { redirectTo } from '@/helpers/redirectHelper.js'
import { useStatus } from '@/composables/useStatus.js'

export const useVehicle = defineStore('vehicles', () => {
  const { status, setStatus } = useStatus()
  const { loading, startLoading, stopLoading } = useLoading()
  const { errors, cleanErrors, setErrors422 } = useErrors()
  const vehicles = ref([])
  const form = reactive({
    plate_number: ''
  })

  function resetForm() {
    form.plate_number = ''
    cleanErrors()
  }

  async function getVehicles() {
    try {
      const response = await axios.get('vehicles')
      vehicles.value = response.data.data
    } catch (error) {
      setStatus('Failed to fetch vehicles:')
    }
  }

  async function updateVehicle(vehicle) {
    startLoading()
    cleanErrors()
    try {
      await axios.put(`vehicles/${vehicle.id}`, form)
      setStatus('Vehicle has been updated.')
      redirectTo('vehicles.index')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      stopLoading()
    }
  }

  async function getVehicle(vehicle) {
    try {
      const response = await axios.get(`vehicles/${vehicle.id}`)
      form.plate_number = response.data.data.plate_number
    } catch (error) {
      setStatus('Failed to fetch vehicles.')
    }
  }

  async function storeVehicle() {
    startLoading()
    cleanErrors()
    try {
      await axios.post('vehicles', form)
      form.plate_number = ''
      setStatus('Vehicle successfully added.')
      redirectTo('vehicles.index')
    } catch (error) {
      setErrors422(error.response)
    } finally {
      form.plate_number = ''
      stopLoading()
    }
  }

  async function deleteVehicle(vehicle) {
    startLoading()
    try {
      await axios.delete(`vehicles/${vehicle.id}`)
      setStatus('Vehicle has been deleted.')
      await getVehicles()
    } catch (error) {
      // Tratamento de erro, se necessário
      console.error('Erro ao deletar o veículo:', error)
    } finally {
      stopLoading()
    }
  }

  return {
    form,
    loading,
    errors,
    vehicles,
    status,
    resetForm,
    getVehicles,
    updateVehicle,
    storeVehicle,
    getVehicle,
    deleteVehicle
  }
})
