---
layout: page
title: Licia - Useful Utility Collection with Zero Dependencies
---

<script setup>
import Home from '@theme/components/Home.vue'
</script>

<Home />

<div class="vp-doc intro">

[Licia](https://licia.liriliri.io/) is a utility library that focus on getting daily works done. Unlike other libraries such as underscore, mout, which strictly separates its functions into several categories like array, string and function etc, licia is just a deadly simple collection of over 400 micro modules dealing problems in different aspects. For example, dom manipulation, cookies, class creation, template, date format, ajax, url, event emitter and a bunch more, even Promise.

## Benefits

Installing one library brings you tons of useful utilities: 

* A dom module with jQuery coding style. 
* A cookie library. 
* dateFormat that is good enough to handle most date related work.
* A Promise polyfill. 
* A micro event emitter library. 
* Ajax and its Promise version fetch.
* Useful functions from underscore, such as shuffle, unique. 
* mkdir, like mkdirp the module that has many dependents in npm.
* ...

## Usage

Just install **licia** and use it like any other npm utility modules such as lodash.

```bash
npm i licia --save
```

```javascript
const uuid = require('licia/uuid');

console.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815
```

There is also an online tool to build a customized utility library, check [here](https://licia.liriliri.io/builder.html).

</div>

<style>
.intro {
  padding: 48px 32px 128px;
  max-width: 1088px;
  margin: 0 auto;
}
</style>