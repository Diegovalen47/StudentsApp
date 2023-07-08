import { createStudent } from "@/server/controllers/student";
import { Prisma } from '@prisma/client'
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
    const student: Student = {
      studentId: 0,
      userName: userName,
      name: name,
      lastName: lastName,
      email: email,
      password: password
    }
    console.log(student)
    const newStudent = await createStudent(student)
    return newStudent
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('User already exists')
        return {
          code: 'P2002',
          error: 'Student already exists',
          message: error.message
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