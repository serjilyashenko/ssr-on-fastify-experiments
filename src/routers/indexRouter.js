import { createElement } from "react";
import { Index } from "../pages/Index.js";
import { About } from "../pages/About.js";
import { renderReactElement } from "../helpers/render.js";

export function indexRouter(fastify, opts, done) {
  fastify.get("/", async (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderReactElement(createElement(Index)));
  });

  fastify.get("/about", async (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderReactElement(createElement(About)));
  });

  done();
}
