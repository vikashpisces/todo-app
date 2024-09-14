<template>
  <div class="todo-module">
    <todo-list-empty
      v-if="!todoList?.length"
      @create-new-todo="handleNewTodoCreation"
    ></todo-list-empty>

    <template v-else>
      <div class="todo-footer">
        <span class="mr-auto ml-4 opacity-75">{{ todoList.length + ' TASKS' }}</span>
        <AppButton type="text" @click="handleClearAll">Clear All</AppButton>
        <new-todo-button @create-new-todo="handleNewTodoCreation" class=""></new-todo-button>
      </div>
      <div class="todo-header">
        <div class="label-controller">
          <label>Sort By: </label>
          <select v-model="sortBy">
            <option v-for="opt in Object.keys(SORT_OPTIONS)" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <template v-for="order in Object.values(SORT_ORDER)" :key="order">
          <div class="label-controller">
            <input type="radio" v-model="sortOrder" :value="order" />
            <label class="cursor-pointer sort-order-label">{{ order }}</label>
          </div>
        </template>
      </div>
      <TodoList :list="todoList" @edit-todo="handleTodoEdit"></TodoList>
    </template>

    <div class="overlay" v-if="showNewTodoForm">
      <NewTodoForm
        class="todo-form"
        @form-close="handleFormCloser"
        :todo-action="todoAction"
        :todo-id="todoId"
      ></NewTodoForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/composable/useLocalStorage'
import { constants } from '@/helper/constants'
import TodoListEmpty from './components/TodoListEmpty.vue'
import TodoList from './components/TodoList.vue'
import NewTodoForm from './components/NewTodoForm.vue'
import NewTodoButton from './components/NewTodoButton.vue'
import AppButton from '@/components/core/AppButton.vue'

const { value, resetItem } = useLocalStorage(constants.LOCAL_STORAGE_KEY, [])

const showNewTodoForm = ref(false)
const handleNewTodoCreation = () => {
  showNewTodoForm.value = true
}
const handleFormCloser = () => {
  showNewTodoForm.value = false
}

const handleClearAll = () => {
  resetItem()
}

enum SORT_OPTIONS {
  Priority = 'Priority',
  Title = 'Title',
  Date = 'Date'
}

enum SORT_ORDER {
  ASC = 'Asc',
  DESC = 'Desc'
}

const PriorityOrder: Record<string, number> = { CRITICAL: 0, MODERATE: 1, OPTIONAL: 2 }

const sortBy = ref(SORT_OPTIONS.Date)
const sortOrder = ref(SORT_ORDER.DESC)

const todoList = computed(() => {
  return (
    value.value?.slice()?.sort((a: any, b: any) => {
      if (sortBy.value === SORT_OPTIONS.Priority) {
        if (sortOrder.value === SORT_ORDER.ASC) {
          return PriorityOrder[a.priority.toUpperCase()] - PriorityOrder[b.priority.toUpperCase()]
        } else if (sortOrder.value === SORT_ORDER.DESC) {
          return PriorityOrder[b.priority.toUpperCase()] - PriorityOrder[a.priority.toUpperCase()]
        }
        return 0
      } else if (sortBy.value === SORT_OPTIONS.Title) {
        const aTodoTitle = a.title
        const bTodoTitle = b.title
        if (sortOrder.value === SORT_ORDER.ASC) {
          return aTodoTitle.localeCompare(bTodoTitle, 'en', { numeric: true })
        } else if (sortOrder.value === SORT_ORDER.DESC) {
          return bTodoTitle.localeCompare(aTodoTitle, 'en', { numeric: true })
        }
        return 0
      } else if (sortBy.value === SORT_OPTIONS.Date) {
        if (sortOrder.value === SORT_ORDER.ASC) {
          return a.id - b.id
        } else if (sortOrder.value === SORT_ORDER.DESC) {
          return b.id - a.id
        }
        return 0
      }
    }) || []
  )
})

const todoId = ref(0)
const todoAction = ref('CREATE')
const handleTodoEdit = (_todoId: number) => {
  showNewTodoForm.value = true
  todoId.value = _todoId
  todoAction.value = 'EDIT'
}
</script>

<style scoped lang="scss">
.todo-module {
  max-width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 1rem;
  .todo-footer {
    position: sticky;
    top: 100vh;
    border: 1px solid var(--app-c-white-mute);
    width: auto;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 1rem;
    height: 65px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    box-shadow: 0px -4px 10px var(--app-c-white-mute);
  }
  .todo-header {
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    display: flex;
    .label-controller {
      display: flex;
      margin-right: 1rem;
      gap: 0.3rem;
      align-items: center;
      input[type='radio'] {
        margin-top: 3px;
        cursor: pointer;
      }
      .sort-order-label {
        margin-left: -5px;
        padding-left: 5px;
      }
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(2px);
    .todo-form {
      position: fixed;
      height: 100vh;
      width: 33vw;
      max-width: 500px;
      right: 0;
      top: 0;
      border-radius: 0.5rem 0 0 0.5rem;
      transition: right 3s cubic-bezier(0, 0, 0.47, 0.5);
    }
  }
}
</style>
