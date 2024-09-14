<template>
  <button class="app-button" :class="computedClass" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
  prevent: { type: Boolean, default: false }
})

const emits = defineEmits(['click'])
const handleClick = (e: Event) => {
  emits('click', e)
  if (props.prevent) {
    e.preventDefault()
  }
}

const computedClass = computed(() => {
  return {
    [`app-button--${props.type}`]: props.type
  }
})
</script>

<style scoped lang="scss">
.app-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: var(--app-c-primary);
  color: var(--app-c-white);
  font-weight: 500;
  cursor: pointer;
  &--transparent {
    background-color: transparent;
    color: var(--color-text);
  }
  &--text {
    background-color: transparent;
    color: var(--app-c-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
