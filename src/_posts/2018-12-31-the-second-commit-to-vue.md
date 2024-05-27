---
layout: post
title:  "The Second Commit to Vue"
---

Looking back in the history of the [Vue framework](https://vuejs.org), I came across [the second commit in the repository](https://github.com/vuejs/vue/commit/871ed9126639c9128c18bb2f19e6afd42c0c5ad9). It seems to be the first commit to have some functional code. I was interested to see how it worked.


# What does this experimental version of Vue do?

You are able to write HTML that has a root element with an `id` and uses double-curlies to denote variables.

```html
<div id="my-app">
    {% raw %}<p>My name is {{name}}</p>{% endraw %}
</div>
```

Using the `Element` constructor, we can bind a DOM element with a given `id` to some initial data that we provide.

```javascript
var app = new Element('my-app', {
    name: 'Dave'
})
```

In this example, Vue manages the `my-app` div and keeps the variables up-to-date with the data that was passed in. It turns the html in the example above into:

```html
<div id="my-app">
    <p>My name is <span>Dave</span></p>
</div>
```

If we change the value of name, the html is automatically updated.

```javascript
app.data.name = 'John'
```

```html
<div id="my-app">
    <p>My name is <span>John</span></p>
</div>
```

# How does this work?


## Step One: Setup

The first thing that Vue does is setup two variables. One is a `bindings` object that stores a reference to each `span` that it is keeping up-to-date. The other is a `data` object that facilitates the core functionality of Vue. More on this later.

## Step Two: Prep the DOM

Vue then finds the element that has an `id` equal to your first parameter, `my-app`, and uses a regular expression to replace all double-curlies with a marked span. It converts the example html to:

```html
<div id="my-app">
    <p>My name is <span data-element-binding='name'></span></p>
</div>
```

Then it sets a key in `bindings` to an empty object to keep track of all the spans that were just setup.

```javascript
bindings = {
    name: {}
}
```

## Step Three: Bind the DOM to Data

Vue loops over all the keys that it setup in `bindings` and does the following for each key:

1. Set the value of an `els` key to a `NodeList` of all nodes that have a matching `data-element-binding` attribute, resulting in an object that looks like:

    ```javascript
    bindings = {
        name: {
            els: NodeList[span]
        }
    }
    ```

2. Remove the `data-element-binding` attribute from the span tag. This prevents polluting the DOM with data attributes relating specifically to Vue.

3. Create the binding using getters and setters on the `data` object. This is the meat of the code, so I'm going to drop it right in.

    ```javascript
    Object.defineProperty(data, variable, {
        set: function (newVal) {
            [].forEach.call(bindings[variable].els, function (e) {
                bindings[variable].value = e.textContent = newVal
            })
        },
        get: function () {
            return bindings[variable].value
        }
    })
    ```

    The setter loops over each DOM Node in the NodeList for the given binding and sets its `textContent` property to the new value that is being set. This updates the DOM any time the value is set. Then we hold the value in the `bindings` object

    ```javascript
    bindings = {
        name: {
            els: NodeList[span],
            value: 'Dave'
        }
    }
    ```

    The getter is simple. It just returns the value from the `bindings` object.

## Step Four: Initialize the Data

Finally, it takes that data that was initially passed in as the second argument and sets that data on the `data` object. Since the bindings are already setup, this puts the DOM in the expected initial state.

# Outro

It is remarkable how similar Vue's current API is to the one designed in this experimental version. Not only that, but the implementation is extremely simple and easy to understand. Obviously, there is still a lot to be desired in this implementation, but it is a simple approach to the core functionality of Vue.
