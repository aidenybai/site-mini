---
title: 'The Past, Present, and Future of Virtual DOM'
description: 'What is the Virtual DOM? Why does it exist? What are its advantages? What will we see in the next 5 years?'
date: 'April 20, 2022'
layout: ../../layouts/Layout.astro
---

> _**Plug**: I help develop [**✦ Million.js**](https://github.com/aidenybai/million): Virtual DOM into the future! 💥🦁✨_

### Table of Contents

- [Introduction](#introduction)
- [Declarative UI _(in the past)_](#declarative-ui-in-the-past)
- [Imperative UI](#imperative-ui)
- [Understanding Virtual DOM _(part 1)_](#understanding-virtual-dom-part-1)
- [Build Your Own Virtual DOM _(part 2)_](#build-your-own-virtual-dom-part-2)
  - [`m(tag, props, children)`](#mtag-props-children)
  - [`createElement(vnode)`](#createlementvnode)
  - [`patch(el, newVNode, oldVNode)`](#patchel-newvnode-oldvnode)
- [Virtual DOM is Pure Overhead _(right now)_](#virtual-dom-is-pure-overhead-right-now)
- [Future of Virtual DOM](#future-of-virtual-dom)
- [✦ Million.js](#-millionjs)

### Introduction

The Virtual DOM was initially pioneered by the [React](https://reactjs.org/) authors to make [declarative](https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-paradigm-in-programming) UI faster to render. To understand why declarative UI was originally so slow, we first need to understand how declarative UI was done in the past.

### Declarative UI <em class="fade">(in the past)</em>

The traditional way of writing declarative UI is to [change the `innerHTML` property](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) on an element. For example, if I want to add a `<div>` element to the UI, I would write the following:

```js
document.body.innerHTML = '<div>Hello World!</div>';
// <body> now has a <div>Hello World!</div> child.
```

We can recognize that `innerHTML` allows us to declaratively define the UI, but it is not very efficient.

The inefficiency stems from the parsing, destruction and reconstruction of the UI every time we change the `innerHTML`. When we change the `innerHTML`, it follows a four step process:

1. Parse the `innerHTML` string into a tree of DOM nodes.
2. Remove all the content in the `<body>` element.
3. Insert the tree of DOM nodes into the `<body>` element.
4. Perform [layout calculation and repaint](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg) the screen.

This process is extremely computationally expensive and can cause render speeds to slow down signifcantly.

### Imperative UI

So, how is this issue fixed? Well, the other option is to use the DOM; this approach is over [**3x faster**](https://jsben.ch/8PheY) than the `innerHTML` method.

```js
const div = document.createElement('div');
div.textContent = 'Hello World!';
document.body.appendChild(div);
```

However, we can recognize this can be cumbersome to write manually, especially when there is a lot of interativity in the UI, as we need to specify every step imperatively. It is much more elegant to write UI declaratively.

> **TL;DR**: The React authors created Virtual DOM to allow us to write UI in a way that is faster to render than `innerHTML` and just as declarative.

### Understanding Virtual DOM <em class="fade">(part 1)</em>

To best understand how Virtual DOM works, let's overview the process and then build an example.

The Virtual DOM is an method of rendering UI. The method utilizes a tree of JavaScript objects ("virtual" nodes) that mimics the DOM tree.

```js
// <div>Hello World!</div>
const div = document.createElement('div');
div.style = 'color: red';
div.textContent = 'Hello World!';
```

The `<div>` above is mimicked as a virtual node in the following JavaScript object:

```js
const divVNode = {
  type: 'div',
  props: {
    style: 'color: red'
  }
  children: ['Hello World!']
};
```

We can notice that the virtual node has three properties:

- `tag`: stores the tag name of the element as a string.
- `props`: stores the properties and attributes of the element as an object.
- `children`: stores virtual node children of the element as an array.

Using virtual nodes, we can model what the current UI looks like, and what we want it to change to when we update the UI.

Let's say I want to change the text inside the `<div>` from `"Hello World!"` to `"Hello Universe!"`. Using the DOM, we can imperatively make the change:

```js
// <div>Hello World!</div>
const div = document.createElement('div');
div.style = 'color: red';
div.textContent = 'Hello World!';

// Change from "Hello World!" to "Hello Universe!"
div.textContent = 'Hello Universe!';
```

But with Virtual DOM, I can just specify what the current UI looks like (old virtual node) and what I want it to look like (new virtual node).

```js
const oldVNode = {
  type: 'div',
  props: {
    style: 'color: red'
  }
  children: ['Hello World!']
};

const newVNode = {
  type: 'div',
  props: {
    style: 'color: red'
  }
  children: ['Hello Universe!']
};
```

However, to make the Virtual DOM actually apply the change to the UI, we need to calculate the difference between the old virtual node and the new virtual node.

```diff
{
  type: 'div',
  props: {
    style: 'color: red'
  }
-  children: ['Hello World!']
+  children: ['Hello Universe!']
};
```

Once we know the difference, the Virtual DOM can change the UI:

```js
div.replaceChild(newChild, oldChild);
```

Instead of replacing the whole UI, the Virtual DOM only makes necessary changes.

### Build Your Own Virtual DOM <em class="fade">(part 2)</em>

In this exercise, we will mimic the [**✦ Million.js**](https://github.com/aidenybai/million) Virtual DOM API. Our API will consist of three main functions: `m`, `createElement`, and `patch`.

#### `m(tag, props, children)`

The `m` function is a helper function that creates virtual nodes. A virtual node contains three properties:

- `tag`: tag name of the virtual node as a string.
- `props`: properties/attributes of the node as an object.
- `children`: children of the virtual node as an array.

An example implementation of the `m` helper function is below:

```js
const m = (tag, props = {}, children = []) => ({
  tag,
  props,
  children,
});
```

This way, it is less cumbersome to create virtual nodes.

```js
m('div', { style: 'color: red' }, ['Hello World!']);
```

#### `createElement(vnode)`

The `createElement` function turns a virtual node into a real DOM element. This is important because we'll be using this in our `patch` function.

The implementation is as follows:

1. Return text node if the virtual node is text.
2. Create a new DOM node with the `tag` property of the virtual node.
3. Iterate over the virtual node `props` and add them to the DOM node.
4. Iterate over the `children`, recursively call `createElement` on each child and add them to the DOM node.

```js
const createElement = (vnode) => {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const el = document.createElement(vnode.tag);
  for (const prop in vnode.props) {
    el[prop] = vnode.props[prop];
  }
  for (const child of vnode.children) {
    el.appendChild(createElement(child));
  }
  return el;
};
```

This way, we can convert virtual nodes to DOM nodes easily:

```jsx
// <div style="color: red">Hello World!</div>
createElement(
  m('div', { style: 'color: red' }, ['Hello World!'])
);
```

#### `patch(el, newVNode, oldVNode)`

The `patch` function takes an existing DOM node, old virtual node, and new virtual node.

The implementation is as follows:

1. Calculate the difference between the two virtual nodes.
2. If virtual node is a `string`, replace the text content of the DOM node with the new node.
3. If virtual node is an `object`, update node if `tag`, `props`, or `children` are different.

```js
const patch = (el, newVNode, oldVNode) => {
  if (!newVNode && newVNode !== '') return el.remove();
  if (
    typeof oldVNode === 'string' ||
    typeof newVNode === 'string'
  ) {
    if (oldVNode !== newVNode) {
      return el.replaceWith(createElement(newVNode));
    }
  } else {
    if (oldVNode.tag !== newVNode.tag) {
      return el.replaceWith(createElement(newVNode));
    }

    // patch props
    for (const prop in {
      ...oldVNode.props,
      ...newVNode.props,
    }) {
      if (newVNode.props[prop] === undefined) {
        delete el[prop];
      } else if (
        oldVNode.props[prop] === undefined ||
        oldVNode.props[prop] !== newVNode.props[prop]
      ) {
        el[prop] = newVNode.props[prop];
      }
    }

    // patch children
    for (let i = oldVNode.children.length - 1; i >= 0; --i) {
      patch(
        el.childNodes[i],
        newVNode.children[i],
        oldVNode.children[i]
      );
    }

    for (
      let i = oldVNode.children.length;
      i < newVNode.children.length;
      i++
    ) {
      el.appendChild(createElement(newVNode.children[i]));
    }
  }
};
```

This way, we can update UI with the `patch` function.

```js
const oldVNode = m('div', { style: 'color: red' }, [
  'Hello World!',
]);
const newVNode = m('div', { style: 'color: red' }, [
  'Hello Universe!',
]);
const el = createElement(oldVNode);

// <div style="color: red">Hello World!</div>
patch(el, oldVNode, newVNode);
// <div style="color: red">Hello Universe!</div>
```

And we've finished our Virtual DOM! Check out the [live example here](https://codesandbox.io/s/virtual-dom-example-8nte0o).

### Virtual DOM is Pure Overhead <em class="fade">(right now)</em>

> _["Virtual DOM is pure overhead"](https://svelte.dev/blog/virtual-dom-is-pure-overhead) --Rich Harris, 2018_

In the present, Virtual DOM implementations incur computation cost when calculating the differences between old and new virtual nodes.

Even with extremely efficient diffing algorithms (like [`list-diff2`](https://www.npmjs.com/package/list-diff2)), when virtual node trees become greater than double digits of virtual nodes, the [cost of diffing becomes significant](https://svelte.dev/blog/virtual-dom-is-pure-overhead).

Tree diffing algorithms are notoriously slow. Time complexity can range from `O(n)` to `O(n^3)` depending on the complexity of the virtual node tree. This is a far cry from DOM manipulation, which is `O(1)` in most cases.

### Future of Virtual DOM

> _["Compilers are the New Frameworks"](https://tomdale.net/2017/09/compilers-are-the-new-frameworks/) --Tom Dale, 2017_

In 2017, Tom Dale, the creator of [Ember](https://emberjs.com/), was one of the first open source zealots to advocate for the use of compilers for JavaScript UI libraries.

In 2022, we now know Tom Dale's bet was spot on. The JavaScript ecosystem has seen the rise in ["compiled"](https://tomdale.net/2017/09/compilers-are-the-new-frameworks/) libraries like [Solid](https://www.solidjs.com/) and [Svelte](https://svelte.dev/), which forgo the Virtual DOM. These libraries skip unnecessary rendering by using a compiler to prerender beforehand and only generating code when used.

Virtual DOM, on the other hand, lags behind on this trend. Current Virtual DOM libraries are inherently not compatible with a "on-demand" compiler. As a result, Virtual DOM render speeds are often **slower than modern "No Virtual DOM" UI libraries** by several magnitudes.

If we want Virtual DOM to be competitive in render speeds in the future, we need to **redesign Virtual DOM to allow for compiler augmentation**.

#### ✦ Million.js

Check out the current effort to bring compilers to Virtual DOM at [**✦ Million.js**](https://github.com/aidenybai/million). We're already [**2-3x faster**](https://millionjs.org/benchmarks/official-benchmarks) than the current non-compiled Virtual DOM libraries.
