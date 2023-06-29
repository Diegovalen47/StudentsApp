<template>
  Hola mundo no necesito root element
  <span>{{ globalStore.count }}</span>
</template>

<script lang="ts" setup>

import { useGlobalStore } from '@/store/index'

const globalStore = useGlobalStore()

</script>

