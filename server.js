const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "snake.html" : req.url
  );
  const extname = path.extname(filepath);
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        res.end("<h1>404 ERROR content not found</h1>");
      } else {
        res.writeHead(500);
        res.end("<h1>SOMTHING WENT WRONG </h1>" + err.code);
      }
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  });
  console.log(filepath);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("server running at PORT:" + PORT));
