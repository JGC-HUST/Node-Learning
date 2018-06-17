const exec = require("child_process").exec;
// const querystring = require('querystring');
const fs = require("fs");
const formidable = require('formidable');

let body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" ' +
  'content="text/html; charset=UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" enctype="multipart/form-data" ' +
  'method="post">' +
  '<input type="file" name="uploadImg">' +
  '<input type="submit" value="Upload file" />' +
  '</form>' +
  '</body>' +
  '</html>';

function start(res) {
  console.log("You visited /start");
  let content = "empty";
  exec("node -v", { timeout: 1000, maxBuffer: 200000000 * 1024 }, (error, stdout, stderr) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    console.log(stdout);
    res.end(body);
  });
}

function upload(res, req) {
  console.log("You visited /upload");
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end(`You've sent ` + querystring.parse(postData).text + `.`);
  let form = new formidable.IncomingForm();
  // 实例化一个formidable.IncomingForm；
  // console.log("about to parse");
  form.uploadDir = "./tmp";
  // 指定上传目录
  form.parse(req, function (error, fields, files) {
    // parse负责解析文件
    // console.log("parsing done");
    fs.renameSync(files.uploadImg.path, "./tmp/test2.png", (err) => {
      throw err;
    });
    // fs模块的renameSync进行重命名
    console.log(files);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    // 使用img 标签来显示图片 ，因为show方法会返回一张图片
    res.end();
  });
}

function show(res) {
  console.log(`You visited /show`);
  fs.readFile("./tmp/test2.png", "binary", (error, file) => {
    if (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(error + '\n');
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "image/png");
      res.write(file, "binary");
      res.end();
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;