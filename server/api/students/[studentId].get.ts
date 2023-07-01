import { getStudentById } from "@/server/controllers/student";

export default defineEventHandler(async (event) => {
  const studentId = Number(event.context.params?.studentId)
  const student = await getStudentById(studentId)
  if (!student) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'Student not found ',
    })
    sendError(event, notFoundError)
  }
  return student
})