## Usage

Install as project dependency:

```bash
yarn add micro-resource
```

Then you can define your resource inside your microservice:

```js
const { resource, filter, find } = require('micro-resource');

const nextId = 1;
const list = [];

module.exports = resource(
  create(({ resource: { data }}) => {

  }),
  filter((req, res) => list),
  find(({ resource: { id }}) => list.find(item => item.id === id)),
);
```
