<script setup>
import { onBeforeMount } from 'vue'
import { useLogin } from '@/stores/login.js'
import ValidationError from '@/components/ValidationError.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'

const store = useLogin()

onBeforeMount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.handleSubmit()" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="store.form.email"
          id="email"
          name="email"
          type="text"
          class="form-input"
          autofocus
          autocomplete="email"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          v-model="store.form.password"
          id="password"
          name="password"
          type="password"
          class="p-1 border bg-gray-100"
          autocomplete="current-password"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label class="flex gap-2 items-center hover:cursor-pointer">
          <input
            v-model="store.form.remember"
            type="checkbox"
            class="w-4 h-4"
            :disabled="store.loading"
          />
          <span class="select-none">Remember me</span>
        </label>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
          Login
          <IconSpinner class="animate-spin" v-show="store.loading" />
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
