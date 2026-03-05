Combinations
============

TypeScript fork of the `combinations` package that returns all array
combinations within optional size bounds.

Installation
------------

```bash
npm install @zwiqler94/combinations
```

Usage
-----

```js
const combinations = require("@zwiqler94/combinations");

const myArray = ["red", "orange", "yellow", "green"];

combinations(myArray);
// [
//   [ "red" ],
//   [ "orange" ],
//   [ "yellow" ],
//   [ "green" ],
//   [ "red", "orange" ],
//   [ "red", "yellow" ],
//   [ "red", "green" ],
//   [ "orange", "yellow" ],
//   [ "orange", "green" ],
//   [ "yellow", "green" ],
//   [ "red", "orange", "yellow" ],
//   [ "red", "orange", "green" ],
//   [ "red", "yellow", "green" ],
//   [ "orange", "yellow", "green" ],
//   [ "red", "orange", "yellow", "green" ]
// ]
```

API
---

```ts
combinations<T>(
  array: T[],
  minOutputSize?: number,
  maxOutputSize?: number
): T[][]
```

- Returns combinations in order of increasing size, preserving input order
  within each combination.
- `minOutputSize` defaults to `1`.
- `maxOutputSize` defaults to `array.length`.
- Size bounds are inclusive.
- Bounds are floored to integers and clamped to `[1, array.length]`.
- If the normalized range is impossible (`max < min`), returns `[]`.
- Duplicate input values are handled positionally.
- Throws a `TypeError` when the first argument is not an array.

Examples with Bounds
--------------------

```js
const combinations = require("@zwiqler94/combinations");
const myArray = ["red", "orange", "yellow", "green"];

combinations(myArray, 2);
// [
//   [ "red", "orange" ],
//   [ "red", "yellow" ],
//   [ "red", "green" ],
//   [ "orange", "yellow" ],
//   [ "orange", "green" ],
//   [ "yellow", "green" ],
//   [ "red", "orange", "yellow" ],
//   [ "red", "orange", "green" ],
//   [ "red", "yellow", "green" ],
//   [ "orange", "yellow", "green" ],
//   [ "red", "orange", "yellow", "green" ]
// ]

combinations(myArray, 2, 3);
// [
//   [ "red", "orange" ],
//   [ "red", "yellow" ],
//   [ "red", "green" ],
//   [ "orange", "yellow" ],
//   [ "orange", "green" ],
//   [ "yellow", "green" ],
//   [ "red", "orange", "yellow" ],
//   [ "red", "orange", "green" ],
//   [ "red", "yellow", "green" ],
//   [ "orange", "yellow", "green" ]
// ]
```

Credits
-------

- Fork maintained by Zwiqler94.
- Forked from the original `combinations` package.
- Original author: Greg Allen.
- Upstream lineage:
  - [firstandthird/combinations](https://github.com/firstandthird/combinations)
  - [jgallen23/combinations](https://github.com/jgallen23/combinations)
