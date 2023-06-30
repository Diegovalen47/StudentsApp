import { createPrueba } from '../../controllers/student'
export default defineEventHandler(async (event) => {
  const { id, name, email } = await readBody(event)
  let prueba = createPrueba(id, name, email)
  return prueba
})