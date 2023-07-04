import prisma from "@/server/controllers/prisma";
import { Prisma } from '@prisma/client'
import Student from "@/models/Student";

export async function getStudents(): Promise<Student[]> {
  try {
    const students = await prisma.student.findMany({
      select: {
        studentId: true,
        userName: true,
        name: true,
        lastName: true,
        email: true,
        password: true
      }
    })
    return students
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function getStudentById(studentId: number): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId: studentId,
      },
      select: {
        studentId: true,
        userName: true,
        name: true,
        lastName: true,
        email: true,
        password: true
      }
    })
    return student
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function getStudentByUserName(userName: string): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userName: userName,
      },
      select: {
        studentId: true,
        userName: true,
        name: true,
        lastName: true,
        email: true,
        password: true
      }
    })
    return student
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function getStudentByEmail(email: string): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: {
        email: email,
      },
      select: {
        studentId: true,
        userName: true,
        name: true,
        lastName: true,
        email: true,
        password: true
      }
    })
    return student
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function createStudent(student: Student): Promise<Student | null> {
  try {
    const result = await prisma.student.create({
      data: {
        userName: student.userName,
        name: student.name,
        lastName: student.lastName,
        email: student.email? student.email : null,
        password: student.password
      }
    })
    return result
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function updateStudent(student: Student): Promise<Student | null> {
  try {
    const result = await prisma.student.update({
      where: {
        studentId: student.studentId
      },
      data: {
        userName: student.userName,
        name: student.name,
        lastName: student.lastName,
        email: student.email? student.email : null,
        password: student.password
      }
    })
    return result
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}

export async function deleteStudent(studentId: number): Promise<Student | null> {
  try {
    const result = await prisma.student.delete({
      where: {
        studentId: studentId
      }
    })
    return result
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
    }
    throw error
  }
}