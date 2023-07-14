<script lang="ts" setup>
import RegisterModal from '@/components/accounts/RegisterModal.vue';
import ForgotPasswordModal from '@/components/accounts/ForgotPasswordModal.vue';
import { useDisplay } from "vuetify";
import { useSwal } from '@/composables/useSwal'
import { useAccountsStore } from '@/store/accounts'
import useFormValidator from '@/composables/useFormValidator'
import useInputRules from '@/composables/useInputRules'

const display = useDisplay()
const accountsStore = useAccountsStore()
const inputRules = useInputRules()
const { Alert } = useSwal();
const axios = useNuxtApp().$axios;

const formData = ref<any>({
  userOrEmail: '',
  password: ''
})
const showPassword = ref<boolean>(false)
const usernameOrEmailRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noOnlySpaces,
  inputRules.noStartWithSpaces,
  inputRules.noEndWithSpaces,
  inputRules.noSpaces
])
const passwordRules = ref<Array<any>>([
  inputRules.fieldRequired,
  inputRules.noOnlySpaces,
])

const userOrEmailComponent = ref()
const userOrEmailValidator = ref<boolean>(true)
const passwordComponent = ref()
const passwordValidator = ref<boolean>(true)
const { validateForm } = useFormValidator([
  { 
    component: userOrEmailComponent, 
    validator: userOrEmailValidator
  },
  { 
    component: passwordComponent,
    validator: passwordValidator 
  }
])

const showRegisterModal = computed({
  get() {
    return accountsStore.showRegisterModal
  },
  set(newValue) {
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

async function loginWithCredentials() {
  const isValid = await validateForm()
  if(isValid) {
    try {
      const response = await axios.post(
        '/api/auth/login',
        formData.value
      )
      console.log('axiosResponse', response)
      Alert.fire({
        title: 'Success',
        toast: true,
        position: 'top-end',
        text: `${response.data.student.name} logged in successfully`,
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`
      navigateTo('/dashboard')
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
async function loginWithGoogle() {
  console.log('Iniciar sesion con google')
}

</script>

<template>
  <v-form>
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
          ref="userOrEmailComponent"
          v-model="formData.userOrEmail"
          label="Enter your username or email"
          placeholder="jonh_doe23 / jonhdoe@mail.com"
          required
          :class="userOrEmailValidator? '' : 'shake'"
          variant="underlined"
          :rules="usernameOrEmailRules"
          @keyup.enter="loginWithCredentials()"
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
          ref="passwordComponent"
          v-model="formData.password"
          label="Enter your password"
          placeholder="superSecretP@s$w0rd"
          variant="underlined"
          :class="passwordValidator? '' : 'shake'"
          required
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="loginWithCredentials()"
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
          @click="loginWithCredentials()"
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
          @click="loginWithGoogle()"
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
