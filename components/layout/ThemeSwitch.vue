<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme()
const modelValue = ref<boolean>(false)

watch(modelValue, async (newValue) => {
  theme.global.name.value = newValue ? 'DarkTheme' : 'LightTheme'
  const { data } = await useFetch(`/api/pruebas/get`, {
    method: 'GET',
  })
})

</script>

<template>
  <v-switch
    v-model="modelValue"
    hide-details
  ></v-switch>
</template>

<style lang="scss" scoped>
  
</style>
