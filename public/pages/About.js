/* global React */
const { createElement, Fragment, useState } = React;

export function About() {
  const [count, setCount] = useState(10);

  return createElement(
    Fragment,
    null,
    createElement("h1", null, "About"),
    createElement("div", null, createElement("a", { href: "/" }, "Home")),
    createElement(
      "div",
      null,
      createElement(
        "button",
        { onClick: () => setCount((prev) => prev + 1) },
        "count: ",
        count
      )
    )
  );
}

export default About;
