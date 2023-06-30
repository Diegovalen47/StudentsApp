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

<template>
  <v-container>
    <v-row>
      <v-col>
        Hola
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">

</style>