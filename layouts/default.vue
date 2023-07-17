<script lang="ts" setup>
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useGlobalStore } from '@/store'

const globalStore = useGlobalStore()

const drawer = computed({
  get: () => globalStore.drawer,
  set: (value) => (globalStore.drawer = value),
})

function toggleDrawer() {
  if (drawer.value === true) {
    drawer.value = false
  }
}
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main @click.stop="toggleDrawer">
      <NuxtPage />
    </v-main>
    <AppFooter />
  </v-app>
</template>
