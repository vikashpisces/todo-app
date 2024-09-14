<template>
  <app-button @click="handleClick"> Add a Todo </app-button>
</template>

<script setup lang="ts">
import AppButton from '@/components/core/AppButton.vue'

const emit = defineEmits(['create-new-todo'])
const handleClick = () => {
  console.log('Add Todo')
  emit('create-new-todo')
}
</script>

<style scoped></style>
