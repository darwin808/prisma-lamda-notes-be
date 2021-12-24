const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context, callback) => {
  try {
    const user = await prisma.note_users.findMany({
      //   select: {
      //     username: true,
      //   },
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error),
    }
  }
}
