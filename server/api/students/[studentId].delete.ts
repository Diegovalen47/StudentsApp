import { deleteStudent } from '@/server/controllers/student'

export default defineEventHandler(async (event) => {
  const studentId = Number(event.context.params?.studentId)
  const deletedStudent = await deleteStudent(studentId)
  if (!deletedStudent) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'Student to delete not found',
    })
    sendError(event, notFoundError)
  }
  return deletedStudent
})
