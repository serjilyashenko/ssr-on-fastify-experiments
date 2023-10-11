// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

// This file includes getting react srcs from CDN

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
    <title>Hello Fastify And React</title>
    <style>
        :root {
            color-scheme: light dark;
            display: flex;
            justify-content: center;
        }
        body {
            max-width: 800px;
            width: 100%;
            padding: 24px;
        }
        .js-status__wrapper {
            display: flex;
            gap: 8px;
        }
        .js-status {
            color: hsl(56, 100%, 30%);
            border: 2px solid hsl(56, 100%, 30%);
            background-color: hsl(56, 100%, 90%);
            border-radius: 8px;
            padding: 4px 8px;
        }
        .js-status_enabled {
            color: hsl(100, 100%, 30%);
            border: 2px solid hsl(100, 100%, 30%);
            background-color: hsl(100, 100%, 90%);
        }
        .js-status_disabled {
            color: hsl(360, 100%, 30%);
            border: 2px solid hsl(360, 100%, 30%);
            background-color: hsl(360, 100%, 90%);
        }
    </style>
</head>
<body>

<div class="js-status__wrapper">
    <noscript>
        <div class="js-status js-status_disabled">
        JS Disabled
        </div>
    </noscript>

    <div id="js-enabled-status" class="js-status js-status_enabled" hidden>
       JS Enabled
    </div>
    
    <div id="js-loading-status" class="js-status" hidden>
       Bundle loading...
    </div>
    
    <script>
        document.getElementById('js-enabled-status').removeAttribute('hidden');
        
        const jsLoadingEl = document.getElementById('js-loading-status');
        jsLoadingEl.removeAttribute('hidden');
        
        function onBundleLoaded() {
          jsLoadingEl.innerText = 'Bundle loaded'
          jsLoadingEl.classList.add('js-status_enabled')
        }
    </script>
</div>


<div id="root">${renderToString(ReactElement)}</div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script type="module" src="/static/bundle.js" onload="onBundleLoaded()"></script>
</body>
</html>
`;
}
