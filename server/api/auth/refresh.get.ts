// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const SECRET = process.env.AUTH_SECRET as string
const runtimeConfig = useRuntimeConfig()
const accessTokenTimeoutInSeconds =
  runtimeConfig.public.accessTokenTimeoutInSeconds
const refreshTokenTimeoutInSeconds =
  runtimeConfig.public.refreshTokenTimeoutInSeconds

export default defineEventHandler((event) => {
  const cookieHeaderValue = getRequestHeader(event, 'Cookie')
  const array = cookieHeaderValue?.split(';')
  const refreshToken = array
    ?.find((element) => element.includes('refresh_token'))
    ?.split('=')[1]

  if (refreshToken === undefined) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '4033: Refresh Token expired',
    })
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, SECRET)
    const studentId = decodedRefreshToken.studentId

    const newAccessToken = jwt.sign(
      {
        studentId,
      },
      SECRET,
      {
        expiresIn: accessTokenTimeoutInSeconds, // 5 minutes
      }
    )

    const newRefreshToken = jwt.sign(
      {
        studentId,
      },
      SECRET,
      {
        expiresIn: refreshTokenTimeoutInSeconds, // 24 hours
      }
    )

    const serializedAccessToken = serialize('access_token', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: accessTokenTimeoutInSeconds,
      path: '/',
    })

    const serializedAccessExpTimestamp = serialize(
      'access_exp_timestamp',
      (Date.now() + accessTokenTimeoutInSeconds * 1000).toString(),
      {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: accessTokenTimeoutInSeconds,
        path: '/',
      }
    )

    const serializedRefreshToken = serialize('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: refreshTokenTimeoutInSeconds,
      path: '/',
    })

    const serializedRefreshExpTimestamp = serialize(
      'refresh_exp_timestamp',
      (Date.now() + refreshTokenTimeoutInSeconds * 1000).toString(),
      {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: refreshTokenTimeoutInSeconds,
        path: '/',
      }
    )

    const record: Record<string, string[]> = {
      'Set-Cookie': [
        serializedAccessToken,
        serializedRefreshToken,
        serializedAccessExpTimestamp,
        serializedRefreshExpTimestamp,
      ],
    }

    setHeaders(event, record)

    return {
      token: {
        message: 'Token refreshed',
      },
    }
  } catch (error) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: '4034: Refresh Token not valid',
    })
  }
})
