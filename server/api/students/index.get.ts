import { getStudents } from "@/server/controllers/student";
import Student from "@/models/Student";

export default defineEventHandler(async (event) => {
  const students: Student[] = await getStudents()
  return students
});