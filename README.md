# Rspack referenced entry module bug

This bug manifests when there are multiple entrypoints that share an entry module that is also referenced by other modules in the bundle.

In this minimal repro, we have two entrypoints, `entry1` and `entry2`. The two are essentially identical:

```js
entry: { entry1: ['./index.js', './bar.js'], entry2: ['./indexAlt.js', './bar.js'] }
```

The only difference is that `index.js` and `indexAlt.js` are separate modules, although they are identical to one another.

In the output for `entry1`, `bar` is treated as an external module, but the module only exists in `entry2`. If you run `node build/entry1.js`, you get:

```
> node build/entry1.js
/Volumes/git/rspack-referenced-entry-module-bug/build/entry1.js:21
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
                             ^

TypeError: __webpack_modules__[moduleId] is not a function
    at __webpack_require__ (/Volumes/git/rspack-referenced-entry-module-bug/build/entry1.js:21:30)
    at /Volumes/git/rspack-referenced-entry-module-bug/build/entry1.js:58:11
    at /Volumes/git/rspack-referenced-entry-module-bug/build/entry1.js:70:3
    at Object.<anonymous> (/Volumes/git/rspack-referenced-entry-module-bug/build/entry1.js:81:3)
    at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Object..js (node:internal/modules/cjs/loader:1689:10)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)

Node.js v22.11.0
```

When you run `node build/entry2.js`, you get the expected output:

```
> node build/entry2.js
bar
```