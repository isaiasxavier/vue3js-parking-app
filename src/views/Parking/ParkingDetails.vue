<script setup>
import { onBeforeUnmount, ref, watchEffect } from 'vue'
import { useParking } from '@/stores/parking'
import { useRoute } from 'vue-router'

const store = useParking()
const route = useRoute()

const detailsFetched = ref(false)

watchEffect(async () => {
  if (!detailsFetched.value) {
    await store.getParkingDetails({ id: route.params.id })
    detailsFetched.value = true
  }
})

onBeforeUnmount(() => {
  store.resetParkingDetails()
  detailsFetched.value = false
})
</script>

<template>
  <div
    class="flex flex-col mx-auto md:w-96 w-full"
    v-if="store.parkingDetails && store.parkingDetails.id !== undefined"
  >
    <h1 class="text-2xl font-bold mb-4 text-center">Parking order details</h1>

    <div class="border p-2 font-mono">
      <div class="font-bold uppercase mb-4">parking order #{{ store.parkingDetails.id }}</div>

      <div class="font-bold uppercase">license plate</div>
      <div class="plate text-2xl">{{ store.parkingDetails.vehicle.plate_number }}</div>

      <div class="font-bold uppercase">zone</div>
      <div>{{ store.parkingDetails.zone.name }}</div>

      <div class="font-bold uppercase">price</div>
      <div>{{ store.parkingDetails.zone.price_per_hour.toFixed(2) }} &euro; per hour</div>

      <div class="font-bold uppercase">from</div>
      <div>{{ store.parkingDetails.start_time }}</div>

      <div class="font-bold uppercase">to</div>
      <div>{{ store.parkingDetails.stop_time }}</div>

      <div class="font-bold uppercase">total</div>
      <div class="text-xl">{{ store.parkingDetails.total_price.toFixed(2) }} &euro;</div>
    </div>

    <div class="border-t h-[1px] my-6"></div>

    <RouterLink :to="{ name: 'parkings.history' }" class="btn btn-secondary uppercase">
      return
    </RouterLink>
  </div>
</template>
