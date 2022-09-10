'use strict'
import path from 'path';
import { fileURLToPath } from "url"
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function createServer({port = 3000}) {
  const fastify = Fastify({logger: true})

  fastify.register(fastifyStatic, {root: path.join(__dirname, '../public')})

  fastify.get('/', async (request, reply) => {
    return "Fastify + React = 🦐"
  })

  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
