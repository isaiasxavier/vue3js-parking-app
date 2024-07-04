<template>
  <ul v-if="errors?.[field]?.length" class="flex flex-col text-red-600 gap-1">
    <li v-for="message in errors[field]" :key="message">
      {{ message }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  errors: Object,
  field: String
})
</script>
