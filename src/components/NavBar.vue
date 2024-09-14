<template>
  <h2 class="nav-title">Todo App</h2>
  <nav class="nav-bar">
    <ul class="nav-bar__menu">
      <li class="nav-bar__menu-item"><router-link to="/">Home</router-link></li>
      <li class="nav-bar__menu-item"><router-link to="/todos">Todo</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.nav {
  margin-left: 2rem;
  &-title {
    padding: 0 0.5rem;
    color: var(--app-c-white);
  }
  &-bar {
    margin-left: auto;
    &__menu {
      display: flex;
      justify-content: space-between;
      &-item {
        padding: 0 0.5rem;
        margin: 0 0.5rem;
        font-weight: 500;
        color: var(--color-text-header);
        opacity: 0.8;
        a {
          text-underline-offset: 4px;
          text-decoration: none;
        }
        &:hover {
          font-weight: 500;
          opacity: 0.6;
        }
        .router-link-exact-active {
          color: var(--app-c-white);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
