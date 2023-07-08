<script lang="ts" setup>

import { useAccountsStore } from '@/store/accounts'
import useFormValidator from '@/composables/useFormValidator'

const accountsStore = useAccountsStore()

const recoveryFormComponent = ref()
const recoveryFormValidator = ref<boolean>(true)
const { validateForm } = useFormValidator([
  { 
    component: recoveryFormComponent, 
    validator: recoveryFormValidator
  }
])
const email = ref<string>('')
const emailRules = ref<Array<any>>([
  (v: string) => !!v || 'Field is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
const showForgotPasswordModal = computed({
  get() {
    return accountsStore.showForgotPasswordModal
  },
  set(newValue) {
    accountsStore.showForgotPasswordModal = newValue
  }
})
async function sendEmail() {
  const isRecoveryFormValid = await validateForm()
  if (isRecoveryFormValid) {
    console.log('Procees with recovery logic')
  } else {
    console.log('Form is not valid')
  }
}


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
      <v-form ref="recoveryFormComponent">
        <v-row>
          <v-col class="d-flex flex-column">
            <h3>Email</h3>
            <v-text-field
              v-model="email"
              label="Enter your email"
              placeholder="jonhdoe@mail.com"
              variant="underlined"
              :class="recoveryFormValidator? '' : 'shake'"
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
            @click="sendEmail()"
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