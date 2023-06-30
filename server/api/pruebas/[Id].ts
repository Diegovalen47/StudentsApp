import { getPrueba } from '@/server/controllers/pruebas'
export default defineEventHandler(async (event) => {
  const id = event.context.params?.Id
  const prueba = await getPrueba(Number(id))
  if (!prueba) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'prueba not found ',
    })
    sendError(event, notFoundError)
  }
  return prueba
})