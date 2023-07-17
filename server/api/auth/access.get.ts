// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { getStudentById } from '@/server/controllers/student'

const SECRET = process.env.AUTH_SECRET as string

export default defineEventHandler(async (event) => {
  const cookieHeaderValue = getRequestHeader(event, 'Cookie')
  const array = cookieHeaderValue?.split(';')
  const accessToken = array
    ?.find((element) => element.includes('access_token'))
    ?.split('=')[1]

  if (accessToken === undefined) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '4031: Access Token epired',
    })
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, SECRET)
    const studentId = decodedAccessToken.studentId
    const student = await getStudentById(studentId)
    return {
      student,
    }
  } catch (error) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '4032: Access Token not valid',
    })
  }
})
