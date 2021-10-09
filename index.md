# <a href="https://git.io/float16">@petamoriken/float16</a>

<p align="center">
  half precision floating point for JavaScript<br>
  See <a href="https://esdiscuss.org/topic/float16array">the archive of the ES Discuss Float16Array topic</a> for details
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@petamoriken/float16">
    <img src="https://img.shields.io/npm/dw/@petamoriken/float16?logo=npm&amp;style=flat-square" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/@petamoriken/float16">
    <img src="https://img.shields.io/npm/v/@petamoriken/float16.svg?label=version&amp;logo=npm&amp;style=flat-square" alt="npm version">
  </a>
  <a href="https://deno.land/x/float16">
    <img src="https://img.shields.io/github/v/tag/petamoriken/float16?label=version&amp;logo=deno&amp;style=flat-square" alt="deno version">
  </a>
  <a href="https://github.com/petamoriken/float16/blob/master/package.json">
    <img src="https://img.shields.io/david/petamoriken/float16?style=flat-square" alt="dependencies">
  </a>
  <a href="https://github.com/petamoriken/float16/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@petamoriken/float16.svg?style=flat-square" alt="license">
  </a>
  <a href="https://codecov.io/gh/petamoriken/float16">
    <img src="https://img.shields.io/codecov/c/gh/petamoriken/float16?logo=codecov&amp;style=flat-square" alt="codecov">
  </a>
</p>

<p align="center">
  <a href="https://saucelabs.com/u/petamoriken">
    <img src="https://saucelabs.com/browser-matrix/petamoriken.svg" alt="Sauce Labs browser matrix">
  </a>
</p>

## Install

```console
npm install @petamoriken/float16
```

```console
yarn add @petamoriken/float16
```

## Import

### Node.js or Bundler (webpack, rollup.js, esbuild, etc)

```js
// ES Modules
import {
  Float16Array, isFloat16Array,
  getFloat16, setFloat16,
  hfround,
} from "@petamoriken/float16";
```

```js
// CommonJS
const {
  Float16Array, isFloat16Array,
  getFloat16, setFloat16,
  hfround,
} = require("@petamoriken/float16");
```

### Deno

You can get modules from [deno.land/x](https://deno.land/x/float16) hosting service.

```ts
import {
  Float16Array, isFloat16Array,
  getFloat16, setFloat16,
  hfround,
} from "https://deno.land/x/float16/mod.ts";
```

### Browser

Deliver a `browser/float16.mjs` or `browser/float16.js` file in the npm package from your Web server with the JavaScript `Content-Type` HTTP header.

```html
<!-- Module Scripts -->
<script type="module">
  import {
    Float16Array, isFloat16Array,
    getFloat16, setFloat16,
    hfround,
  } from "DEST/TO/float16.mjs";
</script>
```

```html
<!-- Classic Scripts -->
<script src="DEST/TO/float16.js"></script>
<script>
  const {
    Float16Array, isFloat16Array,
    getFloat16, setFloat16,
    hfround,
  } = float16;
</script>
```

Or use [jsDelivr](https://cdn.jsdelivr.net/npm/@petamoriken/float16/) CDN.

```html
<!-- Module Scripts -->
<script type="module">
  import {
    Float16Array, isFloat16Array,
    getFloat16, setFloat16,
    hfround,
  } from "https://cdn.jsdelivr.net/npm/@petamoriken/float16/+esm";
</script>
```

```html
<!-- Classic Scripts -->
<script src="https://cdn.jsdelivr.net/npm/@petamoriken/float16/browser/float16.min.js"></script>
<script>
  const {
    Float16Array, isFloat16Array,
    getFloat16, setFloat16,
    hfround,
  } = float16;
</script>
```

ES modules are also available on the [Skypack](https://www.skypack.dev/view/@petamoriken/float16) CDN.

```html
<!-- Module Scripts -->
<script type="module">
  import {
    Float16Array, isFloat16Array,
    getFloat16, setFloat16,
    hfround,
  } from "https://cdn.skypack.dev/@petamoriken/float16?min";
</script>
```

## Support

**This package only uses up to the ES2015 features**, so you should be able to use it without any problems.

`Float16Array` implemented by the `Proxy` object, so IE11 is never supported.

### Pre-transpiled JavaScript files (CommonJS, IIFE)

`lib/` and `browser/` directories in the npm package have JavaScript files already transpiled, and they have been tested automatically in the following environments

* Node.js Active LTS
* Firefox: last 2 versions and ESR
* Chrome: last 2 versions
* Edge: last 2 versions
* Safari: last 2 versions

## API

### `Float16Array`

`Float16Array` is similar to `TypedArray` such as `Float32Array` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)).

```js
const array = new Float16Array([1.0, 1.1, 1.2]);
for (const val of array) {
  console.log(val); // => 1, 1.099609375, 1.19921875
}

array.reduce((prev, current) => prev + current); // 3.298828125
```

### `isFloat16Array`

`isFloat16Array` is a utility function to check whether the value given as an argument is an instance of `Float16Array` or not.

```ts
declare function isFloat16Array(value: unknown): value is Float16Array;
```

```js
isFloat16Array(new Float16Array(10)); // true
isFloat16Array(new Float32Array(10)); // false
isFloat16Array(new Uint16Array(10)); // false
```

### `DataView`

`getFloat16` and `setFloat16` are similar to `DataView` methods such as `DataView#getFloat32` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32)) and `DataView#setFloat32` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32)).

```ts
declare function getFloat16(view: DataView, byteOffset: number, littleEndian?: boolean): number;
declare function setFloat16(view: DataView, byteOffset: number, value: number, littleEndian?: boolean): void;
```

```js
const buffer = new ArrayBuffer(10);
const view = new DataView(buffer);

view.setUint16(0, 0x1234);
getFloat16(view, 0); // 0.0007572174072265625

// You can append methods to DataView instance
view.getFloat16 = (...args) => getFloat16(view, ...args);
view.setFloat16 = (...args) => setFloat16(view, ...args);

view.getFloat16(0); // 0.0007572174072265625

view.setFloat16(0, Math.PI, true);
view.getFloat16(0, true); // 3.140625
```

### `hfround`

`hfround` is similar to `Math.fround` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)).
This function returns nearest half precision float representation of a number.

```ts
declare function hfround(x: number): number;
```

```js
Math.fround(1.337); // 1.3370000123977661
hfround(1.337); // 1.3369140625
```

## `Float16Array` limitations (edge cases)

### The `instanceof` Operator

Since `Float16Array` is made by inheriting from `Uint16Array`, so you can't use the `instanceof` operator to check if it is a `Uint16Array` or not.

```js
new Uint16Array(10) instanceof Uint16Array; // true
new Float16Array(10) instanceof Uint16Array; // true
```

Actually, I could use `Proxy`'s `getPrototypeOf` handler to trap it, but that would be too complex and have some limitations.

In addition, it is a bad idea to use `instanceof` to detect the type of `TypedArray`, because it can't be used to detect the type of objects from other Realms, such as iframe and vm. It is recommended to use `Object#toString` or `@@toStringTag` for this purpose.

```js
function isUint16Array(target) {
  if (target === null || typeof target !== "object") {
    return false;
  }
  return Object.prototype.toString.call(target) === "[object Uint16Array]";
}
```

For Node.js, you can use `util.types` ([document](https://nodejs.org/api/util.html#util_util_types)) instead. Want to do a more solid `TypedArray` check for other environments? Then you can use [this code](https://gist.github.com/petamoriken/6982e7469994a8880bcbef6198203042) 😉

### Built-in Functions

Built-in `TypedArray` objects use "internal slots" for built-in methods. Some limitations exist because the `Proxy` object can't trap internal slots ([explanation](https://javascript.info/proxy#built-in-objects-internal-slots)).

This package isn't polyfill, in other words, it doesn't change native global functions and static/prototype methods.

E.g. `ArrayBuffer.isView` is the butlt-in method that checks if it has the `[[ViewedArrayBuffer]]` internal slot. It returns `false` for `Proxy` object such as `Float16Array` instance.

```js
ArrayBuffer.isView(new Float32Array(10)); // true
ArrayBuffer.isView(new Float16Array(10)); // false
```

### The structured clone algorithm (Web Workers, IndexedDB, etc)

The structured clone algorithm copies complex JavaScript objects. It is used internally when invoking `structuredClone()`, to transfer data between Web Workers via `postMessage()`, storing objects with IndexedDB, or copying objects for other APIs ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)).

It can't clone `Proxy` object such as `Float16Array` instance, you need to convert it to `Uint16Array` or deal with `ArrayBuffer` directly.

```js
const array = new Float16Array([1.0, 1.1, 1.2]);
const cloned = structuredClone({ buffer: array.buffer });
```

### WebGL

WebGL requires `Uint16Array` for buffer or texture data whose types are `gl.HALF_FLOAT` (WebGL 2) or `ext.HALF_FLOAT_OES` (WebGL 1 extension). Do not apply the `Float16Array` object directly to `gl.bufferData` or `gl.texImage2D` etc.

```js
// WebGL 2 example
const vertices = new Float16Array([
  -0.5, -0.5,  0,
   0.5, -0.5,  0,
   0.5,  0.5,  0,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// wrap in Uint16Array
gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(vertices.buffer), gl.STATIC_DRAW);
gl.vertexAttribPointer(location, 3, gl.HALF_FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, null);
gl.enableVertexAttribArray(location);
```

### Others

See JSDoc comments in `src/Float16Array.mjs` for details. If you don't write hacky code, you shouldn't have any problems.


## `Float16Array` Custom inspection

Provides custom inspection for Node.js and Deno, which makes the results of `console.log` more readable.

### Node.js

```js
// ES Modules
import { Float16Array } from "@petamoriken/float16";
import { customInspect } from "@petamoriken/float16/inspect";

Float16Array.prototype[Symbol.for("nodejs.util.inspect.custom")] = customInspect;
```

```js
// CommonJS
const { Float16Array } = require("@petamoriken/float16");
const { customInspect } = require("@petamoriken/float16/inspect");

Float16Array.prototype[Symbol.for("nodejs.util.inspect.custom")] = customInspect;
```

### Deno

```ts
import { Float16Array } from "https://deno.land/x/float16/mod.ts";
import { customInspect } from "https://deno.land/x/float16/inspect.ts";

// deno-lint-ignore no-explicit-any
(Float16Array.prototype as any)[Symbol.for("Deno.customInspect")] = customInspect;
```

## Build

First, download devDependencies.

```console
yarn
```

Build `lib/`, `browser/` files.

```console
yarn run build
```

Build `docs/` files (for browser test).

```console
yarn run docs
```

## Test

First, download devDependencies.

```console
yarn
```

### Node.js Test

```console
yarn build:lib
yarn test
```

### Browser Test

```console
yarn build:browser
yarn docs
```

Access `docs/test/index.html` with browsers.

You can access current [test page](https://petamoriken.github.io/float16/test) ([power-assert version](https://petamoriken.github.io/float16/test/power)) in `master` branch.

## License

MIT License

This software contains productions that are distributed under [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Specifically, `index.d.ts` is modified from the original [TypeScript lib files](https://github.com/microsoft/TypeScript/tree/main/src/lib).