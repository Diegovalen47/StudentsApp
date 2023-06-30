<script lang="ts" setup>
import { useGlobalStore } from '@/store/index'
import { useSwal } from '@/composables/useSwal'

const globalStore = useGlobalStore()
const { Alert } = useSwal();
console.log('antes de llamar a useFetch')
const { data } = await useFetch('/api/hello')
console.log('despues de llamar a useFetch')

// methods
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
        {{ data }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">

</style>