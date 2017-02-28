// <<in {item, items, imports}>>

// : { 
//   <<for name, prop in item.properties>>
//     <<if $i>>, <</if>>
//     <<t name>>
//     <<type  {item: prop, items: items, imports: imports}>>
//   <</for>>
// }

import StringBuilder = require('string-builder');

export default function (sb: StringBuilder, item: any, items: Object, imports: Object) {

}