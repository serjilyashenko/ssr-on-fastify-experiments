import { createElement } from "react";
import { renderReactElement } from "./renderer.js";

import "./react-globals.js"; // This makes page components be executable on both FE and BE sides
import { SuperRouter } from "../public/react-modules/pages/components/SuperRouter.js";
import { App } from "../public/react-modules/App.js";

export function router(fastify, opts, done) {
  // fastify.get("/about", async (request, reply) => {
  //   reply
  //     .code(200)
  //     .header("Content-Type", "text/html; charset=utf-8")
  //     .send(renderReactElement(About));
  // });

  fastify.get("/*", async (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        renderReactElement(
          createElement(SuperRouter, { path: request.url }, createElement(App)),
        ),
      );
  });

  done();
}
