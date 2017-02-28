import buildtypedefs from "./build";

const baseDir = __dirname + "/../../node_modules/"

var modules = [{
  name: "prosemirror-state",
  deps: ["prosemirror-model", "prosemirror-transform", "prosemirror-view"]
}, {
  name: "prosemirror-view",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-model"
}, {
  name: "prosemirror-transform",
  deps: ["prosemirror-model"]
}, {
  name: "prosemirror-commands",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-history",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-collab",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-keymap",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-inputrules",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-schema-basic",
  deps: ["prosemirror-model"]
}, {
  name: "prosemirror-schema-list",
  deps: ["prosemirror-state"]
}, {
  name: "prosemirror-schema-table",
  deps: ["prosemirror-state"]
}]

buildtypedefs(
  {
    baseDir: baseDir,
    srcDir: "/src/",
    templateDir: './templates',
    outDir: './out/'
  },
  modules
);

