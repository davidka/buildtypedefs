var fs = require("fs")
var builddocs = require("builddocs")
var Mold = require("mold-template")

exports.build = function(config, data) {
  let mold = loadTemplates(config, data);

  Object.keys(data.items).forEach((key, index) => {
    let item = data.items[key];
    
    let typeDef = mold.defs.item({ item: item, name: key });
    console.log(typeDef);
    fs.writeFileSync(config.outDir + config.name + ".d.ts", typeDef);
  });
}

function loadTemplates(config, data) {
  let mold = new Mold();

  fs.readdirSync(config.templateDir).forEach(function (filename) {
    mold.bake(filename, fs.readFileSync(config.templateDir + "/" + filename, "utf8").trim())
  });
  

  return mold;
}