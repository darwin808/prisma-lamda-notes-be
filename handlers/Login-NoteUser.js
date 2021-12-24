const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context, callback) => {
  const { password, email } = JSON.parse(event.body)
  try {
    const user = await prisma.note_users.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
      },
    })
    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msg: 'User not found',
        }),
      }
    }
    const checkPassword = (await password) === (await user.password)
    if (!checkPassword) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msg: 'passowrd not incorrect',
        }),
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msg: 'Success',
      }),
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
