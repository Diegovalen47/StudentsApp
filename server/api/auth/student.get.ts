// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { getStudentById } from "@/server/controllers/student";

const SECRET = process.env.AUTH_SECRET as string

export default defineEventHandler(async (event) => {

  const cookieHeaderValue = getRequestHeader(event, 'Cookie')
  const array = cookieHeaderValue?.split(';')
  const accessToken = array?.find(
    (element) => element.includes('access_token')
  )?.split('=')[1]
  const refreshToken = array?.find(
    (element) => element.includes('refresh_token')
  )?.split('=')[1]

  console.log('accessToken', accessToken)

  if (accessToken === undefined) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '1001',
    })
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, SECRET)
    console.log('decodedAccessToken', decodedAccessToken)
    const studentId = decodedAccessToken.studentId
    const student = await getStudentById(studentId)
    return {
      student: student,
    }
  } catch (error) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '1002',
    })
  }
})