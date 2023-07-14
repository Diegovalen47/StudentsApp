// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'
import { getStudentByEmail, getStudentByUserName } from "@/server/controllers/student";
import { comparePassword } from "@/models/Student";
import { serialize } from "cookie";
import { sensitiveHeaders } from 'http2';

const SECRET = process.env.AUTH_SECRET as string

export default defineEventHandler(async (event) => {
  try {

    const { userOrEmail, password } = await readBody(event)

    if(userOrEmail === undefined) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
    if(password === undefined) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }

    let student = undefined

    if (/.+@.+\..+/.test(userOrEmail)) {
      console.log('Email')
      student = await getStudentByEmail(userOrEmail)
    } else {
      console.log('Username')
      student = await getStudentByUserName(userOrEmail)
    }

    if (student?.password === null) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Parece que tu cuenta no fue creada por medio de un usuario y contraseña, por favor intenta con Google.' 
      })
    }

    if (student === null || !comparePassword(password, student.password)) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Invalid credentials, please try again.' 
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
        studentId: student.studentId 
      }, 
      SECRET, 
      { 
        expiresIn: 60*60*24 // 24 hours 
      }
    )

    const serializedAccessToken = serialize('access_token', accessToken, {
      httpOnly: false,
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
      httpOnly: false,
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
      "Set-Cookie" : [
        serializedAccessToken, 
        serializedRefreshToken,
        serializedAccessExpTimestamp,
        serializedRefreshExpTimestamp
      ] 
    }

    setHeaders(event, record)

    return {
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken
      },
      student: {
        studentId: student.studentId,
        userName: student.userName,
        name: student.name,
        lastName: student.lastName,
        email: student.email,
      },
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('Prisma error')
      return {
        token: null,
        error: true,
        message: `${error.code}: ${error.message}}`,
        student: null
      }
    }
    if((error as any).statusCode === 400) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Invalid credentials, please try again.',
        name: 'InvalidCredentials'
      })
    }
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})