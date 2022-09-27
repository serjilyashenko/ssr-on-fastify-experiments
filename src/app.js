import path from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { router } from "./router.js";
import { streamHtmlExperimentHandler } from "./helpers/stream-html-experiment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createServer({ port = 3000 }) {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/static/",
  });

  fastify.get("/html-stream", streamHtmlExperimentHandler);

  fastify.register(router);

  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
