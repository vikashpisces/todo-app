import { mount } from '@vue/test-utils'
import TodoModule from '../../../src/modules/todo/Index.vue'
import TodoListEmpty from '../../../src/modules/todo/components/TodoListEmpty.vue'
import TodoList from '../../../src/modules/todo/components/TodoList.vue'
import TodoListItem from '../../../src/modules/todo/components/TodoListItem.vue'
import NewTodoForm from '../../../src/modules/todo/components/NewTodoForm.vue'
import { constants } from '../../../src/helper/constants'
import { describe, expect, test } from 'vitest'

describe('Todo Module Index.vue', () => {
  test('renders empty state component when there are no todos', () => {
    localStorage.clear()
    const wrapper = mount(TodoModule, {})
    expect(wrapper.findComponent(TodoListEmpty).exists()).toBe(true)
    expect(wrapper.findComponent(TodoList).exists()).toBe(false)
  })

  test('renders todo list component on the load when there is some todos in local storage', () => {
    const initialTodos = [
      { id: 1, title: 'Todo 1', description: 'Description 1', priority: 'Critical' },
      { id: 2, title: 'Todo 2', description: 'Description 2', priority: 'Moderate' },
      { id: 3, title: 'Todo 3', description: 'Description 3', priority: 'Optional' }
    ]

    localStorage.setItem(constants.LOCAL_STORAGE_KEY, JSON.stringify(initialTodos))

    const wrapper = mount(TodoModule, {})
    expect(wrapper.findComponent(TodoListEmpty).exists()).toBe(false)
    expect(wrapper.findComponent(TodoList).exists()).toBe(true)
    expect(wrapper.findAllComponents(TodoListItem).length).toBe(initialTodos.length)
  })

  test('clicking the new todo button should open the new todo form', async () => {
    const wrapper = mount(TodoModule, {})
    const newTodoButton = wrapper.find('[data-test="new-todo-button"]')
    newTodoButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(NewTodoForm).exists()).toBe(true)
  })
})
