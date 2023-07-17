// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'

const SECRET = process.env.AUTH_SECRET as string

export default defineEventHandler((event) => {
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
    jwt.verify(accessToken, SECRET)
    return {
      token: {
        message: 'Access Token is still valid',
      },
    }
  } catch (error) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '4032: Access Token not valid',
    })
  }
})
