import { createElement } from "react";
import { renderReactElement } from "./renderer.js";

import "./react-globals.js"; // This makes page components be executable on both FE and BE sides
import { App } from "../public/static/App.js";

export function router(fastify, opts, done) {
  fastify.get("/*", async (request, reply) => {
    console.log(">> ", request.url);
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderReactElement(createElement(App, { path: request.url })));
  });

  // fastify.get("/about", async (request, reply) => {
  //   reply
  //     .code(200)
  //     .header("Content-Type", "text/html; charset=utf-8")
  //     .send(renderReactComponent(About));
  // });

  done();
}
