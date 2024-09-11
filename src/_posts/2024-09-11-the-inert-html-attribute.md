---
layout: post
title: "The 'inert' HTML Attribute"
tags: ["accessibility"]
---

Today I learned about a relatively new HTML attribute that received full browser compatibility back in April 2023.
That attribute is `inert`. This property is valuable when you want to make your webpage or app more navigable via the keyboard,
particularly when you have offscreen elements. For example, elements in a sidebar. Add the `inert` attribute to
a container and everything inside the container will no longer be interactive with the keyboard or mouse.

You can find more information at the [MDN info page](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert).
