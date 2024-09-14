<template>
  <div class="form-container">
    <div class="flex item-center mb-4">
      <h2>{{ formTitle }}</h2>
      <AppButton type="transparent" class="ml-auto close-btn" @click="handleClose">x</AppButton>
    </div>
    <form @submit.prevent="handleSubmit" ref="todoFormRef">
      <div class="form-group">
        <label>Title</label>
        <input type="text" v-model="formData.title" placeholder="Enter Todo Title" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="formData.description" placeholder="Enter Todo Description (Optional)" />
      </div>
      <div class="form-group">
        <label>Priority</label>
        <select v-model="formData.priority" placeholder="Select a Priority" ref="prioritySelection">
          <option v-for="opt in priorityList" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
      <div class="form-group flex item-center mb-4">
        <AppButton type="submit">{{ submitButtonText }}</AppButton>
        <AppButton type="text" prevent class="ml-auto" @click="handleReset">Reset</AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/core/AppButton.vue'
import { useLocalStorage } from '@/composable/useLocalStorage'
import { constants } from '@/helper/constants'
import { computed, onMounted, reactive, ref, type Ref } from 'vue'

const props = defineProps({
  todoAction: { type: String, default: 'CREATE' },
  todoId: { type: Number, default: 0 }
})

const { getItem, setItem } = useLocalStorage(constants.LOCAL_STORAGE_KEY, [])

enum Priority {
  Critical = 'Critical',
  Moderate = 'Moderate',
  Optional = 'Optional'
}
const formData = reactive({
  title: '',
  description: '',
  priority: Priority.Optional,
  id: 0
})

let initialFormData = {}
onMounted(() => {
  if (props.todoAction === 'EDIT') {
    const todoToEdit = getItem()?.find((todo) => todo.id === props.todoId)
    initialFormData = { ...todoToEdit }
    if (todoToEdit) {
      formData.title = todoToEdit.title
      formData.description = todoToEdit.description
      formData.priority = todoToEdit.priority
      formData.id = todoToEdit.id
    }
  }
})

const formTitle = computed(() => {
  if (props.todoAction === 'EDIT') {
    return 'Edit This Todo'
  }
  return 'Create a TODO'
})

const submitButtonText = computed(() => {
  if (props.todoAction === 'EDIT') {
    return 'Update'
  }
  return 'Create'
})

const priorityList = [Priority.Critical, Priority.Moderate, Priority.Optional]

const handleSubmit = () => {
  const olderTodos = getItem()
  const newFormData = { ...formData }

  if (props.todoAction === 'EDIT') {
    const findTodoIndex = olderTodos.findIndex((todo) => todo.id === props.todoId)
    olderTodos.splice(findTodoIndex, 1, newFormData)
    setItem(olderTodos)
    handleClose()
  } else {
    newFormData.id = new Date().getTime()
    olderTodos.push(newFormData)
    setItem(olderTodos)
  }
}

const emit = defineEmits(['form-close'])
const handleClose = () => {
  console.log('Close')
  emit('form-close')
}

const todoFormRef: Ref<HTMLFormElement | null | undefined> = ref()
const prioritySelection: Ref<HTMLFormElement | null | undefined> = ref()
const handleReset = (e) => {
  if (props.todoAction === 'EDIT') {
    formData.title = initialFormData.title
    formData.description = initialFormData.description
    formData.priority = initialFormData.priority
  } else {
    todoFormRef.value?.reset()
    prioritySelection.value!.selectedIndex = priorityList.indexOf(Priority.Optional)
  }

  e.preventDefault()
}
</script>

<style scoped lang="scss">
.form-container {
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: -6px 0 15px rgba(0, 0, 0, 0.1);
  .close-btn {
    border: 2px solid var(--app-c-gray);
    font-weight: 500;
    border-radius: 100%;
    padding: 0.2rem;
    height: 2rem;
    width: 2rem;
  }
}

.form-group {
  margin-bottom: 20px;
}

input,
textarea,
select {
  width: 100%;
  height: auto;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type='submit'] {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #3e8e41;
}
</style>
