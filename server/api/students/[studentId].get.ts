import { getStudentById } from '@/server/controllers/student'

export default defineEventHandler(async (event) => {
  const studentId = Number(event.context.params?.studentId)
  const student = await getStudentById(studentId)
  if (student === null) {
    return createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: '4041: Student not found',
    })
  }
  delete student.password
  return student
})
