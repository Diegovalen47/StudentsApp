// @ts-expect-error - this is a workaround for the CommonJS/ESM incompatibility
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'
import { getStudentByEmail, getStudentByUserName } from "@/server/controllers/student";

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
    if (student === null || student.password !== password) {
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

    return {
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken
      },
      student: student,
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