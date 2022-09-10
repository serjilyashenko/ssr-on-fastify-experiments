import { Index } from "../pages/Index.js";
import { About } from "../pages/About.js";
import { renderReactComponent } from "../helpers/render.js";

export function indexRouter(fastify, opts, done) {
  fastify.get("/", async (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderReactComponent(Index));
  });

  fastify.get("/about", async (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderReactComponent(About));
  });

  done();
}
