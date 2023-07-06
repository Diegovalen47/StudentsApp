<script lang="ts" setup>

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]

</script>

<template>
  <v-footer
    class="text-center d-flex flex-column"
    color="primary"
  >
    <v-container fluid style="max-width: 1366px">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
  
      <div class="pt-0">
        Test application to organize a college student's syllabi, semesters, subjects, grades, and more.
      </div>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
</style>
