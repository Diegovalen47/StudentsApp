// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'
import { serialize } from 'cookie'
import { z, ZodError } from 'zod'
import {
  getStudentByEmail,
  getStudentByUserName,
} from '@/server/controllers/student'
import { comparePassword, Student } from '@/models/Student'

const SECRET = process.env.AUTH_SECRET as string
const runtimeConfig = useRuntimeConfig()
const accessTokenTimeoutInSeconds =
  runtimeConfig.public.accessTokenTimeoutInSeconds
const refreshTokenTimeoutInSeconds =
  runtimeConfig.public.refreshTokenTimeoutInSeconds

export default defineEventHandler(async (event) => {
  const BodyStructure = z
    .object({
      userOrEmail: z.string({
        required_error: 'User or Email is required',
        invalid_type_error: 'User or Email must be a string',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict()
  const Email = z.string().email()

  try {
    const body = await readBody(event)
    const { userOrEmail, password } = BodyStructure.parse(body)

    const isEmail = Email.safeParse(userOrEmail)
    const student: Student | null = isEmail.success
      ? await getStudentByEmail(userOrEmail)
      : await getStudentByUserName(userOrEmail)

    if (student?.password === null) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message:
          'Your account has been created with Google, login with than option please',
      })
    }

    if (student === null || !comparePassword(password, student.password)) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid Credentials, please try again.',
      })
    }

    const accessToken = jwt.sign(
      {
        studentId: student.studentId,
      },
      SECRET,
      {
        expiresIn: accessTokenTimeoutInSeconds,
      }
    )

    const refreshToken = jwt.sign(
      {
        studentId: student.studentId,
      },
      SECRET,
      {
        expiresIn: refreshTokenTimeoutInSeconds,
      }
    )

    const serializedAccessToken = serialize('access_token', accessToken, {
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

    const serializedRefreshToken = serialize('refresh_token', refreshToken, {
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
      student,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Prisma error',
      })
    }

    if (error instanceof ZodError) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: error.errors[0].message,
      })
    }
  }
})
