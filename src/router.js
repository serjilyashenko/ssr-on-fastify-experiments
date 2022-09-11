import { renderReactComponent } from "./renderer.js";

import "./react-globals.js"; // This makes page components be executable on both FE and BE sides
import { Index } from "../public/pages/Index.js";
import { About } from "../public/pages/About.js";

export function router(fastify, opts, done) {
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
