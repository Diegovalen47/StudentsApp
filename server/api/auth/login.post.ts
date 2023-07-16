// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'
import { getStudentByEmail, getStudentByUserName } from '@/server/controllers/student'
import { comparePassword } from '@/models/Student'
import { serialize } from 'cookie'
import { z, ZodError } from 'zod'
import { Student } from '@/models/Student'

const SECRET = process.env.AUTH_SECRET as string

export default defineEventHandler(async (event) => {

  const BodyStructure = z
    .object({
      userOrEmail: z.string({ 
        required_error: 'User or Email is required', 
        invalid_type_error: 'User or Email must be a string'
      }),
      password: z.string({ 
        required_error: 'Password is required' 
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
        message: 'Your account has been created with Google, login with than option please',
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
        studentId: student.studentId 
      }, 
      SECRET, 
      { 
        expiresIn: 60*5 // 5 minutes 
      }
    )

    const refreshToken = jwt.sign(
      { 
        studentId: student.studentId,
      }, 
      SECRET, 
      { 
        expiresIn: 60*60*24 // 24 hours 
      }
    )

    const serializedAccessToken = serialize('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60*5,
      path: '/'
    })

    const serializedAccessExpTimestamp = serialize('access_exp_timestamp', (Date.now() + 60*5*1000).toString(), {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: 60*5,
      path: '/'
    })

    const serializedRefreshToken = serialize('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60*60*24,
      path: '/'
    })

    const serializedRefreshExpTimestamp = serialize('refresh_exp_timestamp', (Date.now() + 60*60*24*1000).toString(), {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: 60*60*24,
      path: '/'
    })

    const record: Record<string, string[]> = { 
      'Set-Cookie' : [
        serializedAccessToken, 
        serializedRefreshToken,
        serializedAccessExpTimestamp,
        serializedRefreshExpTimestamp
      ] 
    }

    setHeaders(event, record)

    return {
      student: student,
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