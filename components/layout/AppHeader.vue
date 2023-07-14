<script lang="ts" setup>
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue';

const axios = useNuxtApp().$axios;

async function handleSignOut() {
  console.log('Cerrar sesion')
}

async function handleData() {
  try {
    const cookie = useCookie('refresh_token')
    console.log(cookie.value)
    const response = await axios.get('/api/auth/student')
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <v-toolbar color="primary">
    <v-container fluid style="max-width: 1366px">
      <v-row class="d-flex justify-space-between">
        <v-col 
          class="d-flex justify-start"
        >
          <v-btn
            variant="flat"
            color="surface"
            to="/login"
            rounded
            class="text-capitalize"
          >
            Login
          </v-btn>
          <v-btn
            variant="flat"
            color="surface"
            @click="handleData"
            rounded
          >
            Data
          </v-btn>
          <!-- <v-btn
            variant="flat"
            color="surface"
            @click="handleSignOut"
            rounded
            v-else
          >
            Log Out
          </v-btn> -->
        </v-col>
        <v-col
          class="d-flex justify-center align-center"
        >
          <NuxtLink 
            to="/" 
            style="
              text-decoration: none;
              color: rgba(var(--v-theme-surface));
            "
          >
            <h2>StudentsApp</h2>
          </NuxtLink>
        </v-col>
        <v-col
          class="d-flex justify-end"
        >
          <ThemeSwitch/>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

