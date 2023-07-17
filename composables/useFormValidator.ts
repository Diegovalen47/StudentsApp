export default function useFormValidator(inputComponents: any) {
  /**
   * This function validates all the vuetify input components in the form
   * and while doing so, it also sets a validator flag which is
   * useful to aply classes or styles to the input components
   * when they are not valid
   * @param: inputComponents: array of
   * objets with the following structure:
   * { component: ref<any>, validator: ref<boolean>}
   * @returns function that returns true if all the input
   * components are valid and false otherwise
   */
  async function validateForm(): Promise<boolean> {
    let flagValid = true
    for (const inputComponent of inputComponents) {
      const validation = await inputComponent.component.value.validate()
      const isValid =
        validation.length !== undefined
          ? validation.length === 0
          : validation.valid
      if (!isValid) {
        flagValid = false
        inputComponent.validator.value = false
        setTimeout(() => {
          inputComponent.validator.value = true
        }, 1000)
      }
    }
    if (!flagValid) {
      return false
    }
    return true
  }

  return {
    validateForm,
  }
}
