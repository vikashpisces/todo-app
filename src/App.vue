<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import LayoutDefault from '@/layout/LayoutDefault.vue'

const router = useRouter()
const layout = computed(() => router.currentRoute.value.meta.layout || LayoutDefault)
</script>

<style scoped></style>
