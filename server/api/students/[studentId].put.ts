import { updateStudent } from '@/server/controllers/student'
import { Student } from '@/models/Student'

export default defineEventHandler(async (event) => {
  const studentId = Number(event.context.params?.studentId)
  const { userName, name, lastName, email, password } = await readBody(event)
  const student: Student = {
    studentId,
    userName,
    name,
    lastName,
    email,
    password,
  }
  const UpdatedStudent = await updateStudent(student)
  if (!UpdatedStudent) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'Student to update not found ',
    })
    sendError(event, notFoundError)
  }
  return UpdatedStudent
})
