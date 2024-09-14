<template>
  <div class="todo-list">
    <todo-list-item
      v-for="(todo, index) in list"
      :key="todo.id"
      :todo="todo"
      :todo-index="todo.id"
      @edit-todo="$emit('edit-todo', $event)"
    ></todo-list-item>
  </div>
</template>

<script setup lang="ts">
import TodoListItem from './TodoListItem.vue'
defineProps({
  list: { type: Array, default: () => [] }
})
</script>

<style scoped lang="scss">
.todo-list {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  width: 100%;
  height: auto;
  gap: 1rem;
}
</style>
