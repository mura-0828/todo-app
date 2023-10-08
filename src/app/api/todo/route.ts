import { PrismaClient, Todo } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const todos: Todo[] = await prisma.todo.findMany()
  return Response.json(todos)
}
