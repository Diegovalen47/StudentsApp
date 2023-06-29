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
          @click="incrementHandler()"
        >
          Incrementar {{ globalStore.doubleCount }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/index'
import { useSwal } from '@/composables/useSwal'

const globalStore = useGlobalStore()
const { Alert } = useSwal();


function incrementHandler() {
  globalStore.increment()
  Alert.fire({
    title: 'Hello world',
    toast: true,
    position: 'top-end',
    text: 'This is a sweet alert',
    icon: 'success',
    confirmButtonText: 'Cool',
    allowOutsideClick: false,
  })
}

</script>

<style lang="scss">

</style>