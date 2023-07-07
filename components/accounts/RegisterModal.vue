<script lang="ts" setup>
// Imports
import { useAccountsStore } from '@/store/accounts'
// Composables/Hooks
const accountsStore = useAccountsStore()
// Component Variables and Logic
onMounted(() => {
  errorInTermsForm.value = false
})
const registerForm = ref()
const termsForm = ref()
const errorInTermsForm = ref<boolean>(false)
const name = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const acceptedTerms = ref<boolean>(false)
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
const showRegisterModal = computed({
  get() {
    return accountsStore.showRegisterModal
  },
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    accountsStore.showRegisterModal = newValue
  }
})
async function isTermsFormValid(): Promise<boolean> {
  const valid = (await termsForm.value.validate()).valid
  if (!valid) {
    errorInTermsForm.value = true
  }
  return valid
}
async function signUp() {
  const isRegisterFormValid = (await registerForm.value.validate()).valid
  const TermsFormValid = await isTermsFormValid()
  if (isRegisterFormValid && TermsFormValid) {
    console.log('Procees with Register logic')
  } else {
    console.log('Form is not valid')
  }
}
async function signUpWithGoogle() {
  const TermsFormValid = await isTermsFormValid()
  if (!TermsFormValid) {
    console.log('Form is not valid')
  } else {
    console.log('Procees with Google logic')
  }
}

</script>

<template>
  <v-card class="pa-6 rounded-xl" flat>
    <v-card-title class="d-flex justify-space-between">
      <h2>Sign Up</h2>
      <div>
        <v-icon
          color="primary"
          @click="showRegisterModal = false"
        >
          mdi-close
        </v-icon>
      </div>
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
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form ref="termsForm">
        <v-row>
          <v-col
            id="terms-checkbox"
            class="pa-0"
          >
            <v-checkbox 
              v-model="acceptedTerms"
              color="primary"
              :rules="nameRules"
              @update:modelValue="acceptedTerms
                ? errorInTermsForm = false 
                : errorInTermsForm = true
              "
              :style="errorInTermsForm
                ? 'color: rgba(var(--v-theme-error));' 
                : ''
              "
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
            @click="signUp()"
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
            @click="signUpWithGoogle()"
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
