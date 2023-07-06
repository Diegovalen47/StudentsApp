<script lang="ts" setup>

import { useDisplay } from "vuetify";

const display = useDisplay()

const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const emailRules = ref<Array<any>>([
  (v: string) => !!v || 'Field is required',
])
const passwordRules = ref<Array<any>>([
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
])

function handleLogin() {
  console.log('login', display.mdAndUp.value)
}

</script>

<template>
  <v-form ref="loginForm">
    <v-row>
      <v-col 
        class="d-flex"
        :class="display.mdAndUp.value ? 'justify-start' : 'justify-center'"
      >
        <h1>Sign In</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-column">
        <h3>Username or email</h3>
        <v-text-field
          v-model="email"
          label="Enter your username or email"
          placeholder="jonh_doe23 / jonhdoe@mail.com"
          required
          variant="underlined"
          :rules="emailRules"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-column">
        <div class="d-flex flex-row justify-space-between">
          <h3>Password</h3>
          <NuxtLink
            to="/"
            style="
              text-decoration: none;
              color: rgba(var(--v-theme-primary));
            "
          >
            <span style="color: rgba(var(--v-theme-primary))" class="text-right" >Forgot your password?</span>
          </NuxtLink>
        </div>
        <v-text-field
          v-model="password"
          label="Enter your password"
          placeholder="superSecretP@s$w0rd"
          variant="underlined"
          required
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start">
        <v-btn
          color="primary"
          block
          variant="flat"
          rounded
          @click="handleLogin()"
        >
          Login
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          fab
          color="primary"
          rounded
          variant="outlined"
          block
          class="d-flex justify-center align-center"
        >
          <v-img
            src="/google-icon.png"
            style="height: 28px"
            alt="G google symbol"
          /> 
          <span class="pl-2">
            Continue with Google
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-row justify-center">
        <span class="pr-2">Don't have an account?</span>
        <NuxtLink
          to="/"
          style="
            text-decoration: none;
            color: rgba(var(--v-theme-primary));
          "
        >
          <span style="color: rgba(var(--v-theme-primary))" class="text-right" >Sign Up</span>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-form>
</template>

<style lang="scss" scoped>
  
</style>
