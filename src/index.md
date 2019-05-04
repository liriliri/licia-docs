---
layout: index.jade
---

# Licia

Useful utility collection with zero dependencies.

To check all current available functions, click
[here](https://eustia.liriliri.io/module.html).

## Another Lodash?

No. The goal of Licia is to provide a huge number of useful and small JavaScript codes, not just functions, but also modules and classes. Think of it as a mini version of npm suitable for tiny packages.

## Usage

Just install **licia** and use it like any other npm utility modules such as lodash.

```bash
npm i licia --save
```

```javascript
var uuid = require('licia/uuid');

console.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815
```

There is also an online tool to build a customized utility library, check [here](https://eustia.liriliri.io/builder.html).