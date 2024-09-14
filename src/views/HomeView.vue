<template>
  <main class="flex flex-col item-center h-full w-full">
    <h2 class="mb-4">Welcome to the Todo App</h2>
    <RouterLink to="/todos"><AppButton>Go to Todo Page</AppButton></RouterLink>
  </main>
</template>

<script setup lang="ts">
import AppButton from '@/components/core/AppButton.vue'
</script>
