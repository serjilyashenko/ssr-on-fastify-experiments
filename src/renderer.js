import { createElement } from "react";
import { renderToString } from "react-dom/server";

export function renderReactComponent(Component) {
  return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        :root {
            color-scheme: light dark;
        }
    </style>
</head>
<body>

<div id="root">${renderToString(createElement(Component))}</div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script>window.pageComponentName = "${Component.name}";</script>
<script type="module" src="/bundle.js"></script>
</body>
</html>
`;
}
