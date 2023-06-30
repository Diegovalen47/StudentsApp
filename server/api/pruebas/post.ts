import { createPrueba } from '@/server/controllers/pruebas'
export default defineEventHandler(async (event) => {
  const { id, name, email } = await readBody(event)
  let prueba = createPrueba(id, name, email)
  return prueba
})