<script lang="ts" setup>

import { useAccountsStore } from '@/store/accounts'

const accountsStore = useAccountsStore()

const showRegisterModal = computed({
  get() {
    return accountsStore.showRegisterModal
  },
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
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
const emailRules = ref<Array<any>>([
  (v: string) => !!v || 'Field is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

</script>

<template>
  <v-card class="py-6 px-2 rounded-xl" flat>
    <v-card-title class="d-flex justify-space-between">
      <h2>Change your password</h2>
      <div>
        <v-icon
          color="primary"
          @click="showForgotPasswordModal = false"
        >mdi-close</v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <v-form ref="registerForm">
        <v-row>
          <v-col class="d-flex flex-column">
            <h3>Email</h3>
            <v-text-field
              v-model="email"
              label="Enter your email"
              placeholder="jonhdoe@mail.com"
              variant="underlined"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col 
          class="d-flex justify-start"
        >
          <v-btn
            color="primary"
            block
            variant="flat"
            rounded
            @click="console.log('send email')"
          >
            Send recovery
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
  
</style>