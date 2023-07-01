import { createStudent } from "@/server/controllers/student";
import Student from "@/models/Student";

export default defineEventHandler(async (event) => {
  const { userName, name, lastName, email, password } = await readBody(event)
  const student: Student = {
    studentId: 0,
    userName: userName,
    name: name,
    lastName: lastName,
    email: email,
    password: password
  }
  const newStudent = await createStudent(student)
  return newStudent
})