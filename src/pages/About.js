import { createElement, Fragment } from "react";

export function About() {
  return createElement(
    Fragment,
    null,
    createElement("h1", null, "About"),
    createElement(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto doloribus eius esse est eveniet laborum nihil, possimus sequi similique? Assumenda, doloremque eligendi eum fuga fugit modi officiis sed veritatis."
    )
  );
}
