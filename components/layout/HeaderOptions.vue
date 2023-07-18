<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue'
import { useSwal } from '@/composables/useSwal'
import { useStudentsStore } from '@/store/student'
import { useGlobalStore } from '@/store'

const axios = useNuxtApp().$axios
const studentsStore = useStudentsStore()
const globalStore = useGlobalStore()
const display = useDisplay()
const { Alert } = useSwal()

const menu = ref<boolean>(false)
const isLoggedIn = computed(() => studentsStore.isLoggedIn)
const drawer = computed({
  get: () => globalStore.drawer,
  set: (value) => (globalStore.drawer = value),
})

async function handleSignOut() {
  try {
    const { isConfirmed } = await Alert.fire({
      title: 'Do you want to logout?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    })
    if (isConfirmed) {
      await axios.post('/api/auth/logout')
      navigateTo('/')
    }
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
  <div v-if="display.width.value >= 500">
    <div v-if="!isLoggedIn" class="d-flex justify-end">
      <NuxtLink
        class="px-4 d-flex align-center justify-end"
        to="/"
        style="text-decoration: none; color: rgba(var(--v-theme-surface))"
      >
        <span>About</span>
      </NuxtLink>
      <v-btn
        variant="flat"
        color="surface"
        to="/login"
        rounded
        class="text-capitalize"
      >
        Login
      </v-btn>
    </div>
    <div v-else>
      <v-menu
        v-model="menu"
        offset="10"
        :close-on-content-click="false"
        location="bottom end"
        width="200"
      >
        <template #activator="{ props }">
          <div class="d-flex flex-row align-center">
            <div class="gap-2 align-center">
              <v-icon size="30">mdi-account-circle-outline</v-icon>
              <span style="font-size: 20px">{{
                studentsStore.student?.name
              }}</span>
            </div>
            <v-btn icon="mdi-chevron-down" v-bind="props"></v-btn>
          </div>
        </template>
        <v-list
          style="
            background-color: rgba(var(--v-theme-primary-darken-1)) !important;
          "
        >
          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/dashboard"> Dashboard </NuxtLink>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/dashboard"> Mi perfil </NuxtLink>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/"> About </NuxtLink>
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title style="cursor: pointer" @click="handleSignOut">
              <v-icon size="30">mdi-logout</v-icon>
              Log out
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
  <div v-else>
    <v-btn icon="mdi-menu" @click.stop="drawer = !drawer"></v-btn>
    <v-navigation-drawer v-model="drawer" location="right">
      <v-list>
        <v-list-item v-if="isLoggedIn">
          <div class="gap-2 align-center">
            <v-icon size="30">mdi-account-circle-outline</v-icon>
            <div class="d-flex flex-column">
              <span style="font-size: 20px">{{
                studentsStore.student?.name
              }}</span>
              <small>Mi perfil</small>
            </div>
          </div>
        </v-list-item>
        <v-divider v-if="isLoggedIn"></v-divider>
        <v-list-item v-if="!isLoggedIn">
          <v-list-item-title>
            <NuxtLink to="/login" style="text-decoration: none">
              Log In
            </NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-title>
            <NuxtLink to="/dashboard" style="text-decoration: none">
              Dashboard
            </NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title class="d-flex flex-row align-center gap-4">
            <ThemeSwitch class="my-4" />
            <span>Switch Theme</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-title style="cursor: pointer" @click="handleSignOut">
            <v-icon size="30">mdi-logout</v-icon>
            Log out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
