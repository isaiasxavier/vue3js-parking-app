import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useErrors } from '@/composables/useErrors.js'
import axios from 'axios'
import { useLoading } from '@/composables/useLoading.js'

export const useZone = defineStore('zones', () => {
  const { error, cleanErrors, setErrors404 } = useErrors()
  const { loading, startLoading, stopLoading } = useLoading()
  const zones = ref([])
  const form = reactive({
    name: '',
    price_per_hour: ''
  })

  function resetForm() {
    form.name = ''
    form.price_per_hour = ''
    cleanErrors()
  }

  async function getZones() {
    cleanErrors()
    startLoading()
    try {
      const response = await axios.get('zones')
      zones.value = response.data.data
    } catch (error) {
      setErrors404(error.response)
    } finally {
      stopLoading()
    }
  }

  return { form, loading, error, zones, resetForm, getZones }
})
