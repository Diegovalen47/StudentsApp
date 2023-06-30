import prisma from "@/server/controllers/prisma";

export async function getPruebas() {
  const pruebas = await prisma.pRUEBA.findMany({
    select: {
      Id: true,
    }
  })
}

export async function getPrueba(id: number) {
  const post = await prisma.pRUEBA.findUnique({
    where: {
      Id: id,
    },
    select: {
      Id: true,
      NAME: true,
      email: true
    }
  })
  return post
}

export async function createPrueba(id: number, name: string, email: string) {
  let result = null
  result = await prisma.pRUEBA.create({
    data: {
      Id: id,
      NAME: name,
      email: email
    }
  })
  return result
}