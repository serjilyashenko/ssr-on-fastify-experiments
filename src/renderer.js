import { renderToString } from "react-dom/server";

export function renderReactElement(ReactElement) {
  return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    <title>Document</title>
    <style>
        :root {
            color-scheme: light dark;
        }
    </style>
</head>
<body>

<div id="root">${renderToString(ReactElement)}</div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script type="module" src="/static/bundle.js"></script>
</body>
</html>
`;
}
