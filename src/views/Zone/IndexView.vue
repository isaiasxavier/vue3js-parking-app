<script setup>
import { onMounted } from 'vue'
import { useZone } from '@/stores/zone.js'

const store = useZone()

onMounted(store.getZones)
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Available Zones</h1>
    <div class="border-t h-[1px] my-6"></div>
    <div class="flex flex-col gap-2">
      <div
        v-for="zone in store.zones"
        :key="zone.id"
        class="flex bg-gray-100 w-full p-2 justify-between"
      >
        <div class="flex items-center overflow-hidden w-full">
          <div class="text-sm mr-2.5 text-blue-600">Name:</div>
          <div class="text-xl plate">
            {{ zone.name }}
          </div>
        </div>
        <div class="flex items-center overflow-hidden w-full">
          <div class="text-sm mr-2.5 text-blue-600">Price:</div>
          <div class="text-xl plate">€{{ zone.price_per_hour }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
