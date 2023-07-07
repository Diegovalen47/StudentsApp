<script lang="ts" setup>

import RegisterModal from '@/components/accounts/RegisterModal.vue';
import ForgotPasswordModal from '@/components/accounts/ForgotPasswordModal.vue';
import { useDisplay } from "vuetify";
import { useAccountsStore } from '@/store/accounts'

const display = useDisplay()
const accountsStore = useAccountsStore()

const showRegisterModal = computed({
  get() {
    return accountsStore.showRegisterModal
  },
  set(newValue) {
    console.log('seteo de show', newValue)
    accountsStore.showRegisterModal = newValue
  }
})

const showForgotPasswordModal = computed({
  get() {
    return accountsStore.showForgotPasswordModal
  },
  set(newValue) {
    accountsStore.showForgotPasswordModal = newValue
  }
})

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
          <v-dialog
            v-model="showForgotPasswordModal"
            persistent
            width="512"
          >
            <template v-slot:activator="{ props }">
              <span 
                style="
                  color: rgba(var(--v-theme-primary));
                  cursor: pointer;
                " 
                class="text-right"
                @click="showForgotPasswordModal = true"
              >
                Forgot your password?
              </span>
            </template>
            <ForgotPasswordModal/>
          </v-dialog>
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
      <v-col 
        cols="12"
        sm="6"
        class="d-flex justify-start"
      >
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
      <v-col
        cols="12"
        sm="6"
      >
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
        <v-dialog
          v-model="showRegisterModal"
          persistent
          width="683"
        >
          <template v-slot:activator="{ props }">
            <span 
              style="
                color: rgba(var(--v-theme-primary));
                cursor: pointer;
              " 
              class="text-right"
              @click="showRegisterModal = true"
            >
              Sign Up
            </span>
          </template>
          <RegisterModal />
        </v-dialog>
      </v-col>
    </v-row>
  </v-form>
</template>

<style lang="scss" scoped>
  
</style>
