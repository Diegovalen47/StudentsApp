import { deleteStudent } from "@/server/controllers/student";
import Student from "@/models/Student";

export default defineEventHandler(async (event) => {
  const studentId = Number(event.context.params?.studentId)
  const DeletedStudent = await deleteStudent(studentId)
  if (!DeletedStudent) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'Student to delete not found',
    })
    sendError(event, notFoundError)
  }
  return DeletedStudent
})