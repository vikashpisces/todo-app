// https://on.cypress.io/api

describe('Todo App', () => {
  it('visits home page', () => {
    cy.visit('/')
    cy.contains('h2', 'Welcome to the Todo App')
    cy.contains('a .app-button', 'Go to Todo Page')
  })

  it('should show empty state on load', () => {
    localStorage.clear()
    cy.visit('/todos')
    cy.contains('h2', 'No ToDo items yet !!!')
    cy.contains('[data-test="new-todo-button"]', ' Add a Todo ')
  })

  it('should navigates to todo page on new todo button click', () => {
    cy.intercept('/todos')
    cy.visit('/')
    cy.get('[data-test="goto-todo-page"]').click()
    cy.url().should('include', '/todos')
  })

  it('should show todo list on load', () => {
    const initialTodos = [
      { id: 1, title: 'Todo 1', description: 'Description 1', priority: 'Critical' },
      { id: 2, title: 'Todo 2', description: 'Description 2', priority: 'Moderate' },
      { id: 3, title: 'Todo 3', description: 'Description 3', priority: 'Optional' }
    ]
    localStorage.setItem('ping-identity', JSON.stringify(initialTodos))
    cy.visit('/todos')
    cy.get('.todo-list').should('be.visible')
  })

  it('should allow user to create new todo', () => {
    localStorage.clear()
    cy.visit('/todos')
    cy.get('[data-test="new-todo-button"]').click()
    cy.get('[data-test="new-todo-form"]').should('be.visible')
    cy.get('[data-test="new-todo-form"] .todo-title').type('My First Todo')
    cy.get('[data-test="new-todo-form"] .todo-description').type('My First Todo')
    cy.get('[data-test="new-todo-form"] .todo-priority').select('Critical')
    cy.get('[data-test="new-todo-form"] .submit-btn').click()

    cy.get('.todo-list').should('be.visible')
    cy.get('.todo-list .todo-list__item').should('have.length', 1)
    cy.get('.todo-list .todo-list__item .todo-title').should('contain', 'My First Todo')
    cy.get('.todo-list .todo-list__item .todo-description').should('contain', 'My First Todo')
    cy.get('.todo-list .todo-list__item .todo-priority').should('contain', 'Critical')
  })
})
