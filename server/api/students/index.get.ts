import { getStudents } from '@/server/controllers/student'
import { Student } from '@/models/Student'

export default defineEventHandler(async () => {
  const students: Student[] = await getStudents()
  return students.map((student) => {
    delete student.password
    return student
  })
})
