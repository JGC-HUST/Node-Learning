const http = require('http');
const url = require('url');

function start(route, handle) {
  const hostname = '127.0.0.1';
  const port = 8888;

  const onRequest = (req, res) => {
    console.log(`********** START **********`)
    let pathname = url.parse(req.url).pathname;
    // let postData = "";

    // req.setEncoding("utf8");
    // req.addListener("data", (postDataChunk) => {
    //   postData += postDataChunk;
    //   console.log("Received POST data chunk" + `'${postDataChunk}'`);
    // });
    // req.addListener("end", () => {
    //   route(handle, pathname, res, postData);
    // })
    //console.log("Request for" + pathname + " received.")
    route(handle, pathname, res, req)
    console.log(`********** END **********`)
  };
  const server = http.createServer(onRequest);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

exports.start = start;