const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context, callback) => {
  const { title, post, user_id } = JSON.parse(event.body)
  try {
    const isUserExist = await prisma.note_users.findUnique({
      where: {
        id: user_id,
      },
    })
    if (!isUserExist) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('User not Found'),
      }
    }

    const newPost = await prisma.note_posts.create({
      data: {
        title,
        post,
        user_id,
      },
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
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
