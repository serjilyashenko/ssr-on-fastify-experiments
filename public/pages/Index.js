/* global React */
const { createElement, useState, Fragment } = React;

export function Index() {
  const [count, setCount] = useState(1);

  return createElement(
    Fragment,
    null,
    createElement("h1", null, "Hello Fastify And React 🦐"),
    createElement("div", null, createElement("a", { href: "/about" }, "About")),
    createElement(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum eum ex explicabo magni modi mollitia numquam tempora. Eligendi eveniet harum modi, necessitatibus nemo omnis quaerat sequi vel veniam voluptatem."
    ),
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

export default Index;
