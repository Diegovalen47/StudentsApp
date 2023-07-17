<script lang="ts" setup>
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue'
import { useSwal } from '@/composables/useSwal'
import { useStudentsStore } from '@/store/student'

const axios = useNuxtApp().$axios
const studentsStore = useStudentsStore()
const { Alert } = useSwal()

const isLoggedIn = computed({
  get() {
    return studentsStore.isLoggedIn
  },
  set(newValue) {
    studentsStore.isLoggedIn = newValue
  },
})

async function handleSignOut() {
  try {
    await axios.post('/api/auth/logout')
    Alert.fire({
      title: 'Success',
      toast: true,
      position: 'top-end',
      text: 'Logged out successfully',
      icon: 'success',
      confirmButtonText: 'Cool',
    })
    navigateTo('/')
  } catch (error) {
    Alert.fire({
      title: (error as any).response.data.statusMessage,
      text: (error as any).response.data.message,
      icon: 'error',
      confirmButtonText: 'Cool',
      allowOutsideClick: true,
    })
  }
}
async function data() {
  try {
    await axios.get('/api/students')
    Alert.fire({
      title: 'Success',
      text: 'Test button',
      icon: 'success',
      confirmButtonText: 'Cool',
    })
  } catch (error) {
    Alert.fire({
      title: (error as any).response.data.statusMessage,
      text: (error as any).response.data.message,
      icon: 'error',
      confirmButtonText: 'Cool',
      allowOutsideClick: true,
    })
  }
}
</script>

<template>
  <v-toolbar color="primary">
    <v-container fluid style="max-width: 1366px">
      <v-row class="d-flex justify-space-between">
        <v-col class="d-flex justify-start">
          <v-btn
            v-if="!isLoggedIn"
            variant="flat"
            color="surface"
            to="/login"
            rounded
            class="text-capitalize"
          >
            Login
          </v-btn>
          <v-btn
            v-else
            variant="flat"
            color="surface"
            rounded
            @click="handleSignOut"
          >
            Log Out
          </v-btn>
          <v-btn
            class="mx-4"
            variant="flat"
            color="surface"
            rounded
            @click="data"
          >
            Data
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <NuxtLink
            to="/"
            style="text-decoration: none; color: rgba(var(--v-theme-surface))"
          >
            <h2>StudentsApp</h2>
          </NuxtLink>
        </v-col>
        <v-col class="d-flex justify-end">
          <ThemeSwitch />
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
