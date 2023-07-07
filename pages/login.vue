<script lang="ts" setup>
import Login from "@/components/accounts/Login.vue";

</script>

<template>
  <v-container fluid class="py-16" style="max-width: 1366px">
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center align-center"
      >
        <v-img
          src="/login.png"
          alt="screen, lock, person and paper representing login"
        />
      </v-col>
      <v-col 
        cols="12"
        md="6"
        class="d-flex flex-column justify-center"
      >
        <Login />  
      </v-col>
    </v-row>
  </v-container>
</template>

