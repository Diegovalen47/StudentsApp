<script lang="ts" setup>
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue';
</script>

<template>
  <v-toolbar color="primary">
    <v-row>
      <v-col>
        <v-btn
          class="ml-3"
          variant="flat"
          color="surface"
        >
          Ingresar
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <h3>StudentsApp</h3>
      </v-col>
      <v-col class="d-flex justify-end">
        <ThemeSwitch/>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

