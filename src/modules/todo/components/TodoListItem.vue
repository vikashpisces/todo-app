<template>
  <div class="todo-list__item">
    <div class="todo-title flex justify-between">
      <h3>{{ todo.title }}</h3>
      <div>
        <span>{{ todoCreatedAt }}</span>
        <span> ( {{ todoRelativeTime }} )</span>
      </div>
    </div>
    <div class="todo-description">
      <p>{{ todo.description }}</p>
    </div>
    <div class="flex">
      <div class="todo-priority" :class="`todo-priority--${todo.priority.toLowerCase()}`">
        {{ todo.priority }}
      </div>
      <div class="todo-actions ml-auto">
        <i
          class="fa-regular fa-pen-to-square cursor-pointer"
          style="color: var(--app-c-primary)"
          @click="editTodo"
          title="Edit this Todo"
        ></i>
        <i
          class="fa-regular fa-trash-can cursor-pointer"
          style="color: var(--app-c-danger)"
          @click="deleteTodo"
          title="Delete this Todo"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@/composable/useLocalStorage'
import { constants } from '@/helper/constants'
import { computed } from 'vue'

const props = defineProps({
  todo: { type: Object, default: () => ({}) },
  todoIndex: { type: Number, default: 0 }
})

const { getItem, setItem } = useLocalStorage(constants.LOCAL_STORAGE_KEY, [])

const todoCreatedAt = computed(() => {
  const date = new Date(props.todo.id)
  return date.toDateString()
})

const todoRelativeTime = computed(() => {
  const date = new Date(props.todo.id)
  return date.toLocaleTimeString()
})

const deleteTodo = () => {
  const olderTodos = getItem()
  const findTodoIndex = olderTodos.findIndex((todo) => todo.id === props.todo.id)
  olderTodos.splice(findTodoIndex, 1)
  setItem(olderTodos)
}

const emit = defineEmits(['edit-todo'])
const editTodo = () => {
  emit('edit-todo', props.todoIndex)
}
</script>

<style scoped lang="scss">
.todo-list {
  &__item {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    border: 1px solid var(--app-c-white-mute);
    box-shadow: 1px 3px 6px var(--app-c-white-mute);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    .todo {
      &-priority {
        width: max-content;
        padding: 3px 0.3rem;
        color: var(--app-c-white);
        border-radius: 0.25rem;
        font-size: 0.75rem;
        &--critical {
          background-color: var(--app-c-danger);
        }
        &--moderate {
          background-color: var(--app-c-warning);
        }
        &--optional {
          background-color: var(--app-c-primary);
        }
      }
      &-actions {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
}
</style>
