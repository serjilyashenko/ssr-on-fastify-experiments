import { Readable } from "stream";

export async function streamHtmlExperimentHandler(request, reply) {
  let dataToStream = [
    "<!doctype html>\n" +
      '<html lang="en">\n' +
      "<head>\n" +
      '    <meta charset="UTF-8">\n' +
      '    <meta name="viewport"\n' +
      '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
      '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
      "    <title>Document</title>\n" +
      "<style>:root { color-scheme: light dark; display: flex; justify-content: center;\n }\n body {\n max-width: 900px;\n width: 100%;\n padding: 24px;\n }</style>" +
      "</head>\n",
    "<body>\n" + "<h1>Hello Streaming HTML</h1>\n",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n",
    "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magnsdfsfdi nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    '<div style="display: flex; justify-content: center; gap: 10px;">\n',
    "<div>1</div>\n",
    "<div>2</div>\n",
    "<div>3</div>\n",
    "<div>4</div>\n",
    "<div>5</div>\n",
    "<div>6</div>\n",
    "<div>7</div>\n",
    "<div>8</div>\n",
    "</div>\n",
    '<div style="display: flex; justify-content: center; gap: 10px;">\n',
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n",
    "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magni nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "<p>\n" +
      "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum distinctio dolorem, facere odio possimus quo\n" +
      "    tempora? Deserunt eligendi2354645 eos id magnsdfsfdi nam necessitatibus quo veniam, vitae. Nihil, soluta, tempore.\n" +
      "</p>",
    "</div>\n",
    "</body>\n" + "</html>",
  ];

  class MyReadable extends Readable {
    constructor(options) {
      super(options);
    }

    _read() {
      // The consumer is ready for more data
      setTimeout(() => {
        this.push(dataToStream.shift());
        if (!dataToStream.length) {
          this.push(null); // End the stream
        }
      }, 300);
    }

    _destroy() {
      // Not necessary, but illustrates things to do on end
      dataToStream = null;
    }
  }
  const stream = new MyReadable({ decodeStrings: false });

  // reply.hijack();
  reply.raw.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  stream.pipe(reply.raw);

  // const timer = setInterval(() => {
  //   reply.raw.write(dataToStream.shift());
  //   if (!dataToStream.length) {
  //     reply.raw.end();
  //     clearInterval(timer);
  //   }
  // }, 300);
}
