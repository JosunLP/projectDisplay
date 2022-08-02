var fs = require("fs");
var path = require("path");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != "EEXIST") throw e;
  }
}

function copyFiles(source, target) {
  var files = fs.readdirSync(source);
  files.forEach(function (file) {
    var sourceFile = path.join(source, file);
    var targetFile = path.join(target, file);
    var stat = fs.lstatSync(sourceFile);
    if (stat.isDirectory()) {
      mkdirSync(targetFile);
      copyFiles(sourceFile, targetFile);
    } else {
      fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
    }
  });
}

function copyFile(source, target) {
  fs.writeFileSync(target, fs.readFileSync(source));
}

deleteFolderRecursive("./dist");
mkdirSync("./dist");
mkdirSync("./dist/images");
copyFiles("./src/images", "./dist/images");
copyFile("./src/index.html", "./dist/index.html");

console.log("Deployed to ./dist");
