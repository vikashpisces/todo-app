<template>
  <div class="empty-message">
    <div>
      <h2>No ToDo items yet !!!</h2>
      <p>Plan your day by adding your first todo item.</p>
      <p>Click the button below</p>
    </div>
    <new-todo-button @create-new-todo="$emit('create-new-todo')"></new-todo-button>
  </div>
</template>

<script setup lang="ts">
import NewTodoButton from './NewTodoButton.vue'
</script>

<style scoped lang="scss">
.empty-message {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2rem;
  p + p {
    margin-top: 0.5rem;
  }
}
</style>
