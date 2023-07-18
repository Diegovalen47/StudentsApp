<script lang="ts" setup></script>

<template>
  <v-container fluid class="py-16" style="max-width: 1366px">
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          src="/guy_student.png"
          height="400"
          width="400"
          alt="screen, lock, person and paper representing login"
        />
      </v-col>
      <v-col cols="12" md="4" class="d-flex flex-column justify-center gap-4">
        <div>
          <h1>All you need for college</h1>
          <h1>in one place</h1>
        </div>
        <div>
          <v-btn
            color="primary"
            style="border-radius: 10px"
            block
            @click="navigateTo('/login')"
          >
            Start now
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-img
          src="/laptop-utils.png"
          height="400"
          width="400"
          alt="screen, lock, person and paper representing login"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
