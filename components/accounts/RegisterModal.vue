<script lang="ts" setup>
import { useAccountsStore } from '@/store/accounts'
import useFormValidator from '@/composables/useFormValidator'
import useInputRules from '@/composables/useInputRules'
import { useSwal } from '@/composables/useSwal'

const accountsStore = useAccountsStore()
const inputRules = useInputRules()
const { Alert } = useSwal()
const axios = useNuxtApp().$axios

const formData = ref<any>({
  userName: null,
  name: null,
  lastName: null,
  email: null,
  password: null,
})
const acceptedTerms = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const userNameRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noStartWithSpaces,
  inputRules.noOnlySpaces,
  inputRules.noSpaces,
  inputRules.noEndWithSpaces,
])
const nameRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noStartWithSpaces,
  inputRules.noOnlySpaces,
  inputRules.nameValid,
  inputRules.noEndWithSpaces,
])
const emailRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noStartWithSpaces,
  inputRules.noOnlySpaces,
  inputRules.emailValid,
  inputRules.noEndWithSpaces,
])
const passwordRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noStartWithSpaces,
  inputRules.noOnlySpaces,
  inputRules.passwordMinLength,
  inputRules.securePassword,
  inputRules.noEndWithSpaces,
])

const userNameComponent = ref()
const userNameValidator = ref<boolean>(true)
const nameComponent = ref()
const nameValidator = ref<boolean>(true)
const lastNameComponent = ref()
const lastNameValidator = ref<boolean>(true)
const emailComponent = ref()
const emailValidator = ref<boolean>(true)
const passwordComponent = ref()
const passwordValidator = ref<boolean>(true)
const termsComponent = ref()
const termsValidator = ref<boolean>(true)
const RegisterValidator = useFormValidator([
  {
    component: userNameComponent,
    validator: userNameValidator,
  },
  {
    component: nameComponent,
    validator: nameValidator,
  },
  {
    component: lastNameComponent,
    validator: lastNameValidator,
  },
  {
    component: emailComponent,
    validator: emailValidator,
  },
  {
    component: passwordComponent,
    validator: passwordValidator,
  },
  {
    component: termsComponent,
    validator: termsValidator,
  },
])
const GoogleRegisterValidator = useFormValidator([
  {
    component: termsComponent,
    validator: termsValidator,
  },
])

const showRegisterModal = computed({
  get: () => accountsStore.showRegisterModal,
  set: (value) => (accountsStore.showRegisterModal = value),
})

async function signUp() {
  const isValid = await RegisterValidator.validateForm()
  if (isValid) {
    try {
      const response = await axios.post(
        '/api/students/register',
        formData.value
      )
      showRegisterModal.value = false
      Alert.fire({
        title: 'Success',
        text: `${response.data.student.name} registered successfully, login to continue`,
        icon: 'success',
        confirmButtonText: 'Cool',
        allowOutsideClick: true,
      })
    } catch (error) {
      Alert.fire({
        title: (error as any).response.data.statusMessage,
        text: (error as any).response.data.message,
        icon: 'error',
        confirmButtonText: 'Cool',
        allowOutsideClick: true,
      })
    }
  }
}
async function signUpWithGoogle() {
  const isValid = await GoogleRegisterValidator.validateForm()
  if (isValid) {
    console.log('Procees with Google logic')
  } else {
    console.log('Form is not valid Google')
  }
}
</script>

<template>
  <v-card class="pa-6 rounded-xl" flat>
    <v-card-title class="d-flex justify-space-between">
      <h2>Sign Up</h2>
      <div>
        <v-icon color="primary" @click="showRegisterModal = false">
          mdi-close
        </v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col class="pb-0 d-flex flex-column">
            <h3>User Name</h3>
            <v-text-field
              ref="userNameComponent"
              v-model="formData.userName"
              label="Enter your user name"
              placeholder="jhon34_Doe"
              variant="underlined"
              :class="userNameValidator ? '' : 'shake'"
              :rules="userNameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 d-flex flex-column" cols="12" md="6">
            <h3>Name</h3>
            <v-text-field
              ref="nameComponent"
              v-model="formData.name"
              label="Enter your name"
              placeholder="Jhon"
              variant="underlined"
              :class="nameValidator ? '' : 'shake'"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col class="pb-0 d-flex flex-column" cols="12" md="6">
            <h3>Last Name</h3>
            <v-text-field
              ref="lastNameComponent"
              v-model="formData.lastName"
              label="Enter your last name"
              placeholder="Doe"
              variant="underlined"
              :class="lastNameValidator ? '' : 'shake'"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 d-flex flex-column">
            <h3>Email</h3>
            <v-text-field
              ref="emailComponent"
              v-model="formData.email"
              label="Enter your email"
              placeholder="jonhdoe@mail.com"
              variant="underlined"
              :class="emailValidator ? '' : 'shake'"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 d-flex flex-column">
            <h3>Password</h3>
            <v-text-field
              ref="passwordComponent"
              v-model="formData.password"
              label="Enter your password"
              placeholder="superSecretP@s$w0rd"
              variant="underlined"
              :class="passwordValidator ? '' : 'shake'"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form ref="termsComponent">
        <v-row>
          <v-col id="terms-checkbox" class="pa-0">
            <v-checkbox
              v-model="acceptedTerms"
              color="primary"
              :rules="nameRules"
              :class="termsValidator || acceptedTerms ? '' : 'shake'"
              :style="
                !termsValidator && !acceptedTerms
                  ? 'color: rgba(var(--v-theme-error));'
                  : ''
              "
            >
              <template #label>
                <div>
                  I agree that
                  <v-tooltip location="bottom" offset="3">
                    <template #activator="{ props }">
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
        <v-col cols="12" class="d-flex justify-start" sm="6">
          <v-btn color="primary" block variant="flat" rounded @click="signUp()">
            Sign Up
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-start" cols="12" sm="6">
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
            <span class="pl-2"> Sign Up with Google </span>
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
