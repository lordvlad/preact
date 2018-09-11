# Changelog

## Differences from Preact

### Major changes

1. The VNode shape has changed
    1. `attributes` has been renamed to `props`
    2. `nodeName` is now `tag`
    3. `props.children`
        1. The children of a VNode are no longer guaranteed to be a flat array. It could be `undefined`
           or it could be a nested array of children.
        2. A Component with no children will not have a `children` prop defined on `props`. Preact
           instead guaranteed an empty list would always be there. That can no longer be relied on.
        3. `children` is only stored as a property on the `props` property (i.e. `props.children`).
2. `h` has been renamed to `createElement`
3. `render` no longer returns the newly created DOM element. Its return type is now `void`
4. `render` no longer supports a third argument to hydrate the DOM. Use the new `hydrate`
   function to hydrate a server rendered DOM tree
5. Setting the DOM `style` attribute to a string is not supported
6. `setState` no longer modifies `this.state` synchronously
7. Falsy attributes values are no longer removed from the DOM. For some attributes (e.g. `spellcheck`)
   the values `false` and `''` have different meaning so being able to render `false` is important

### Minor changes

1. `addEventListener` and `removeEventListner` are called every time an event handler is changed
2. `render(null, container)` no longer renders an empty text node but instead renders nothing

### For contributors

1. `scratch.innerHTML = ''` no longer is an effective technique to clear the DOM during testing. If you think you need to
   clear the DOM during a test, consider breaking your tests into multiple individual tests to cover your function.