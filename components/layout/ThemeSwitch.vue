<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme()
const modelValue = ref<boolean>(false)

watch(modelValue, (newValue) => {
  theme.global.name.value = newValue ? 'DarkTheme' : 'LightTheme'
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
