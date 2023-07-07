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

const name = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const termsAndConditions = ref<boolean>(false)
const nameRules = ref<Array<any>>([
  (v: string) => !!v || 'Field is required',
])
const emailRules = ref<Array<any>>([
  (v: string) => !!v || 'Field is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
const passwordRules = ref<Array<any>>([
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
])

</script>

<template>
  <v-card class="pa-6 rounded-xl" flat>
    <v-card-title class="d-flex justify-space-between">
      <h2>Sign Up</h2>
      <v-btn
        color="primary"
        variant="text"
        @click="showRegisterModal = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="registerForm">
        <v-row>
          <v-col 
            class="d-flex flex-column"
            cols="12"
            md="6"
          >
            <h3>Name</h3>
            <v-text-field
              v-model="name"
              label="Enter your name"
              placeholder="Jhon"
              variant="underlined"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col 
            class="d-flex flex-column"
            cols="12"
            md="6"
          >
            <h3>Last Name</h3>
            <v-text-field
              v-model="lastName"
              label="Enter your last name"
              placeholder="Doe"
              variant="underlined"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
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
        <v-row>
          <v-col class="pb-0 d-flex flex-column">
            <h3>Password</h3>
            <v-text-field
              v-model="password"
              label="Enter your password"
              placeholder="superSecretP@s$w0rd"
              variant="underlined"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            id="terms-checkbox"
            class="pa-0"
          >
            <v-checkbox 
              v-model="termsAndConditions"
              color="primary"
              :rules="nameRules"
            >
              <template v-slot:label>
                <div>
                  I agree that
                  <v-tooltip 
                    location="bottom"
                    offset="3"
                  >
                    <template v-slot:activator="{ props }">
                      <a
                        target="_blank"
                        href="https://vuetifyjs.com"
                        v-bind="props"
                        style="
                          color: rgba(var(--v-theme-primary));
                          text-decoration: none;
                        " 
                        @click.stop
                      >
                        Vuetify
                      </a>
                    </template>
                    Opens in new window
                  </v-tooltip>
                  is awesome
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col 
          class="d-flex justify-start"
          cols="12"
          sm="6"
        >
          <v-btn
            color="primary"
            block
            variant="flat"
            rounded
            @click="console.log('register')"
          >
            Sign Up
          </v-btn>
        </v-col>
        <v-col 
          class="d-flex justify-start"
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
              Sign Up with Google
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
#terms-checkbox {
  .v-input {
    .v-input__control {
      margin-bottom: -20px !important;
    }
  }
  .v-input__details {
    padding-top: 0px !important;
    padding-left: 12px !important;
  }
}
</style>
