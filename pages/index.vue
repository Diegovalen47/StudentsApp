<template>
  <v-container>
    <v-row class="test-class">
      <v-col>
        <HelloWorld />
      </v-col>
      <v-col>
        <MyComponent />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          @click="globalStore.increment()"
        >
          Incrementar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/index'

const globalStore = useGlobalStore()

</script>


<style lang="scss">

</style>