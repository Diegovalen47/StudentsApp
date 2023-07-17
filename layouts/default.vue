<script lang="ts" setup>
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>
