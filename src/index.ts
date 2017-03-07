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
  "dom.Node": { replacement: "Node"},
  "Node": { replacement: "ProsemirrorNode", source: "prosemirror-model"},
  "dom.Event": { replacement: "Event"},
  "dom.Element": { replacement: "Element"},
  "dom.Document": { replacement: "Document"},
  "dom.DocumentFragment": { replacement: "DocumentFragment"},
  "dom.KeyboardEvent": { replacement: "KeyboardEvent"},
  "dom.MouseEvent": { replacement: "MouseEvent"},
  "dom.MutationRecord": { replacement: "MutationRecord"},
  "OrderedMap": { replacement: "OrderedMap", source: "orderedmap"}
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

