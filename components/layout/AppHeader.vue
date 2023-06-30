<script lang="ts" setup>
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue';
</script>

<template>
  <v-toolbar
    color="primary"
  >
    <v-toolbar-title>Vuetify</v-toolbar-title>
    <v-spacer></v-spacer>
    <ThemeSwitch/>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: $blue-dark-secondary;
}
</style>

