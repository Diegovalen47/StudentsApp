import prisma from "@/server/controllers/prisma";
import Student from "../../models/Student";

export async function getStudents(): Promise<Student[]> {
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
}

export async function getStudentById(id: number): Promise<Student | null> {
  const student = await prisma.student.findUnique({
    where: {
      studentId: id,
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
}

export async function createStudent(student: Student) {
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
}