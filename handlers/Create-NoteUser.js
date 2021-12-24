const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context, callback) => {
  const { username, password, email } = JSON.parse(event.body)
  try {
    const newUser = await prisma.note_users.create({
      data: {
        username,
        password,
        email,
      },
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error,
        message: 'Try Again later',
      }),
    }
  }
}
