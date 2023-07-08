import { createStudent } from "@/server/controllers/student";
import { Prisma } from '@prisma/client'
import { validValue } from '@/utils/fieldsValidation'
import Student from "@/models/Student";

export default defineEventHandler(async (event) => {
  try {
    const { 
      userName, 
      name, 
      lastName, 
      email, 
      password 
    } = await readBody(event)
    if(name === undefined) {
      return {
        error: true,
        message: 'name is required',
        student: null
      }
    }
    if(email === undefined) {
      return {
        error: true,
        message: 'email is required',
        student: null
      }
    }
    const student: Student = {
      studentId: -1,
      name: name,
      email: email,
      userName: validValue(userName),
      lastName: validValue(lastName),
      password: validValue(password),
    }
    console.log(student)
    const newStudent = await createStudent(student)
    return {
      message: 'Student created',
      student: newStudent,
      error: false
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('User already exists')
        return {
          error: true,
          message: `${error.code}: Student already exists`,
          student: null
        }
      }
    }
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})