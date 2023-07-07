export const useAccountsStore = defineStore('accounts', {
  state: () => ({ 
    showRegisterModal: false,
    showForgotPasswordModal: false,
  })
})