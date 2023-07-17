<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue'
import HeaderOptions from '@/components/layout/HeaderOptions.vue'

const display = useDisplay()
</script>

<template>
  <v-toolbar color="primary">
    <v-container fluid style="max-width: 1366px">
      <v-row class="d-flex justify-space-between">
        <v-col
          v-if="display.width.value >= 500"
          class="d-flex justify-start align-center"
        >
          <ThemeSwitch />
        </v-col>
        <v-col
          class="d-flex flex-row align-center"
          :class="
            display.width.value >= 500 ? 'justify-center' : 'justify-start'
          "
        >
          <NuxtLink
            to="/"
            style="text-decoration: none; color: rgba(var(--v-theme-surface))"
          >
            <h2>StudentsApp</h2>
          </NuxtLink>
        </v-col>
        <v-col class="d-flex justify-end">
          <HeaderOptions />
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
