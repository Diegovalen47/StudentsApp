export default function useInputRules() {

    const fieldRequired = (v: string) => 
      !!v 
      || 'Field is required'
    const emailValid = (v: string) => 
      /.+@.+\..+/.test(v) 
      || 'E-mail must be valid'
    const passwordMinLength = (v: string) => 
      v.length >= 8 
      || 'Password must be at least 8 characters'
    const securePassword = (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(v) 
      || 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    const userNameMinLength = (v: string) => 
      v.length >= 6 
      || 'Field must be at least 6 characters'
    const userNameMaxLength = (v: string) => 
      v.length <= 15 
      || 'Fied must be at most 15 characters'
    const nameValid = (v: string) => 
      /^[a-zA-Z\s]*$/.test(v)
      || 'Only letters and middle spaces are allowed'
    const noOnlySpaces = (v: string) => 
      !/^\s*$/.test(v) 
      || 'Cannot be only spaces'
    const noStartWithSpaces = (v: string) =>
      !/^\s/.test(v) 
      || 'Cannot start with spaces'
    const noEndWithSpaces = (v: string) =>
      !/\s$/.test(v) 
      || 'Cannot end with spaces'
    const noSpaces = (v: string) =>
      !/\s/.test(v)
      || 'Cannot have spaces'
    
    return {
      fieldRequired,
      emailValid,
      passwordMinLength,
      securePassword,
      userNameMinLength,
      userNameMaxLength,
      nameValid,
      noOnlySpaces,
      noStartWithSpaces,
      noEndWithSpaces,
      noSpaces
    };
  }