import { Prisma } from '@prisma/client'
import { z, ZodError } from 'zod'
import { createStudent } from '@/server/controllers/student'
import { validValue } from '@/utils/fieldsValidation'
import { Student, encryptPassword } from '@/models/Student'

const BodyStructure = z
  .object({
    userName: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
  .strict()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userName, name, lastName, email, password } =
      BodyStructure.parse(body)

    let hashedPassword
    if (password !== undefined && password !== null && password !== '') {
      hashedPassword = encryptPassword(password)
    } else {
      hashedPassword = password
    }
    const student: Student = {
      studentId: -1,
      name,
      email,
      userName: validValue(userName),
      lastName: validValue(lastName),
      password: validValue(hashedPassword),
    }

    const newStudent = await createStudent(student)

    delete newStudent.password

    return {
      message: 'Student created',
      student: newStudent,
      error: false,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: `${error.code}: Student already exists`,
        })
      }
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `${error.code}: Prisma error`,
      })
    }

    if (error instanceof ZodError) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: error.errors[0].message,
      })
    }

    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Generic Error',
    })
  }
})
