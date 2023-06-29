<template>
  <div class="test-class">
    <HelloWorld />
    <MyComponent />
  </div>
  <div>
    <button
      @click="globalStore.increment()"
    >
      Incrementar
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/index'

const globalStore = useGlobalStore()

</script>


<style lang="scss">

</style>