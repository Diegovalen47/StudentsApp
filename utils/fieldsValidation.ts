export function validValue(value: string | undefined): null | string {
  if (value === undefined || value === "") { 
    return null
  }
  return value
}