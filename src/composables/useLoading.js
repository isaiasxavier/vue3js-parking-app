import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)

  function startLoading() {
    if (loading.value) return false
    loading.value = true
    return true
  }

  function stopLoading() {
    loading.value = false
  }

  return { loading, startLoading, stopLoading }
}
