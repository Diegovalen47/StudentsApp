import prisma from '@/server/controllers/prisma'
import { Student } from '@/models/Student'

export async function getStudents(): Promise<Student[]> {
  const students = await prisma.student.findMany({
    select: {
      studentId: true,
      userName: true,
      name: true,
      lastName: true,
      email: true,
      password: true,
    },
  })
  return students
}

export async function getStudentById(
  studentId: number
): Promise<Student | null> {
  const student = await prisma.student.findUnique({
    where: {
      studentId,
    },
    select: {
      studentId: true,
      userName: true,
      name: true,
      lastName: true,
      email: true,
      password: true,
    },
  })
  return student
}

export async function getStudentByUserName(
  userName: string
): Promise<Student | null> {
  const student = await prisma.student.findUnique({
    where: {
      userName,
    },
    select: {
      studentId: true,
      userName: true,
      name: true,
      lastName: true,
      email: true,
      password: true,
    },
  })
  return student
}

export async function getStudentByEmail(
  email: string
): Promise<Student | null> {
  const student = await prisma.student.findUnique({
    where: {
      email,
    },
    select: {
      studentId: true,
      userName: true,
      name: true,
      lastName: true,
      email: true,
      password: true,
    },
  })
  return student
}

export async function createStudent(student: Student): Promise<Student> {
  const result = await prisma.student.create({
    data: {
      userName: student.userName,
      name: student.name,
      lastName: student.lastName,
      email: student.email,
      password: student.password,
    },
  })
  return result
}

export async function updateStudent(student: Student): Promise<Student | null> {
  const result = await prisma.student.update({
    where: {
      studentId: student.studentId,
    },
    data: {
      userName: student.userName,
      name: student.name,
      lastName: student.lastName,
      email: student.email,
      password: student.password,
    },
  })
  return result
}

export async function deleteStudent(
  studentId: number
): Promise<Student | null> {
  const result = await prisma.student.delete({
    where: {
      studentId,
    },
  })
  return result
}
