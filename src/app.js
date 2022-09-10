'use strict'
import Fastify from 'fastify'

export async function createServer({port = 3000}) {
  const fastify = Fastify({logger: true})

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
