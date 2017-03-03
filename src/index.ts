import buildtypedefs from "./build";

const baseDir = __dirname + "/../../node_modules/"

let modules = [{
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
  name: "prosemirror-menu",
  deps: ["prosemirror-view"]
}, {
  name: "prosemirror-schema-table",
  deps: ["prosemirror-state"]
}]

let additionalTypes = {
  "dom.Node": { replacement: "DOMNode", source: "./dom"},
  "dom.Event": { replacement: "DOMEvent", source: "./dom"},
  "dom.Element": { replacement: "DOMElement", source: "./dom"},
  "dom.Document": { replacement: "DOMDocument", source: "./dom"},
  "dom.DocumentFragment": { replacement: "DOMDocumentFragment", source: "./dom"},
  "dom.KeyboardEvent": { replacement: "DOMKeyboardEvent", source: "./dom"},
  "dom.MouseEvent": { replacement: "DOMMouseEvent", source: "./dom"},
  "dom.MutationRecord": { replacement: "DOMMutationRecord", source: "./dom"},
  "OrderedMap": { replacement: "OrderedMap", source: "orderedmap"},
  "Error": { replacement: "DOMError", source: "./dom"},
};


buildtypedefs(
  {
    baseDir: baseDir,
    srcDir: "/src/",
    templateDir: './templates',
    outDir: './out/typings/'
  },
  modules,
  additionalTypes
);

