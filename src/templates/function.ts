// <<in {item, items, imports, isParam}>>

// <<if item.name>><<t item.name>><</if>>
// <<if isParam>>: <</if>>
// (
// <<for param item.params || []>>
//   <<if $i>>, <</if>><<if param.rest>>...<</if>>
//   <<if param.type == "Function">>
//     <<fntype {item: param, items: items, imports: imports, isParam: true}>>
//   <<else>>
//     <<if param.name>><<t param.name>><</if>><<type {item: param, items: items,imports: imports}>>
//   <</if>>
  
// <</for>>
// )

// <<if item.returns>>
//   <<if isParam>><<t "=> ">><</if>>
//   <<type { item: item.returns, skipOptional: true, items: items, imports: imports }>>
// <<else>>
//   <<if isParam>><<t "=> ">>
//   <<else>>:   
//   <</if>>
//   void
// <</if>>


import StringBuilder = require('string-builder');

export default function (sb: StringBuilder, item: any, items: Object, imports: Object) {

}