<script lang="ts" setup>
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue';

async function handleSignOut() {
  console.log('Cerrar sesion')
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

