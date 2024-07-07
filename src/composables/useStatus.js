import { ref } from 'vue'

export function useStatus() {
  const status = ref('')

  function setStatus(newStatus) {
    status.value = newStatus
    setTimeout(() => {
      status.value = ''
    }, 5000)
  }

  return { status, setStatus }
}
