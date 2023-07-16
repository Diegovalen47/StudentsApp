<script lang="ts" setup>

import { useTheme } from 'vuetify'

const theme = useTheme()
const isDarkMode = ref<boolean>(false)
const themeCookie = useCookie('theme')

onMounted(() => {
  if (themeCookie.value) {
    theme.global.name.value = themeCookie.value
    isDarkMode.value = themeCookie.value === 'DarkTheme'
  }
})

function toggleTheme() {
  if (theme.global.current.value.dark) {
    theme.global.name.value = 'LightTheme'
    isDarkMode.value = false
    themeCookie.value = 'LightTheme'
  } else {
    theme.global.name.value = 'DarkTheme'
    isDarkMode.value = true
    themeCookie.value = 'DarkTheme'
  }
}

</script>

<template>
  <div
    class="
      d-flex flex-row align-center justify-space-between 
      switch-background
    "
    @click="toggleTheme()"
  >
    <div 
      class="
        d-flex align-center justify-center 
        circle
      " 
      :class="{ 
        'dark': isDarkMode 
      }"
    >
      <v-icon 
        class="icon" 
        color="primary" 
        :icon="isDarkMode 
          ? 'mdi-moon-waxing-crescent' 
          : 'mdi-weather-sunny'
        " 
      />
    </div>
    <div class="switch-placeholder"></div>
    <div class="switch-placeholder"></div>
  </div>
</template>

<style lang="scss" scoped>

$switch-height: 32px;
$icon-size: 24px;

.switch-background {
  position: relative;
  height: $switch-height;
  width: calc($switch-height * 2);
  border-radius: $br-max;
  background-color: rgba(var(--v-theme-primary-lighten-1));
  z-index: 2 !important;
  gap: 8px;

  &:hover {
    cursor: pointer;
  }
}
.icon {
  font-size: $icon-size;
  z-index: 4 !important;
  transition: all 0.3s ease-in-out;
}
.circle {
  position: absolute;
  top: auto;
  bottom: auto;
  left: 0px;
  z-index: 3 !important;
  width: $switch-height;
  height: $switch-height;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-surface));
  transition: all 0.3s ease-in-out;
  
  &.dark {
    left: calc(100% - $switch-height);
  }
}
.switch-placeholder {
  width: $icon-size;
  height: $icon-size;
}
</style>
