const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let title = queryData.id;
  if (_url == "/") {
    title = "welcome";
  }
  if (_url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  fs.readFile(`data/${title}`, "utf8", (err, description) => {
    const template = `
    <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="/?id=html">HTML</a></li>
    <li><a href="/?id=css">CSS</a></li>
    <li><a href="/?id=javascript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p>${description}</p>
</body>
</html>
`;
    response.end(template);
  });
});
app.listen(3000);
