# Array Walker

Traverses a multi-dimensional array and fires off a callback with a value and its relationship.

## Example

```javascript
let walker = require('array-walker');

// A single-dimensional array
walker(['a', 'b'], (value, key) => console.log(value, key));
// a, 0
// b, 1

// A two-dimensional array
walker([['a', 'b'], ['c', 'd']], (value, x, y) => console.log(value, x, y));
// a, 0, 0
// b, 0, 1
// c, 1, 0
// d, 1, 1

// A 12-dimensional array
walker(
  [[[[[[[[[[[['a', 'b']]]]]], 'c']]]]]],
  (value, ...lineage) => console.log(value, ...lineage)
);
// a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
// b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
// c, 0, 0, 0, 0, 0, 1

```
## Installation
```
$ npm install array-walker
```
## API
```javascript
var walker = require('array-walker');
```
### walker(items, observationCallback, ...lineage)
| Type | Data Type | Name | Description |
| --- | --- | --- | --- |
| parameter | \*[] | items | The array to walk. |
| parameter | function | observationCallback | The function to call when a non-array value is found. |
| parameter | ...number | [lineage] | The parent indexes. |
| returns | undefined | n/a | n/a |

### observationCallback(value, ...lineage)

The observation callback is fired when a non-array value is found.

| Type | Data Type | Name | Description |
| --- | --- | --- | --- |
| parameter | !\*[] | value | The value that was discovered. |
| parameter | ...number | lineage | The indexes in each dimension of the array. |
| returns | undefined | n/a | n/a |

## Links
- Github: [array-walker](https://github.com/lewismoten/array-walker)
