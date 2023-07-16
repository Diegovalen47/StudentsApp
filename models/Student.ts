import bcrypt from 'bcrypt'

export type Student = {
  studentId: number,
  userName: string | null,
  name: string,
  lastName: string | null,
  email: string,
  password: string | null
}

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}