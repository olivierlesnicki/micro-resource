const test = require('ava');
const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise');

const { rest, create, destroy, filter, find, replace, update } = require('./');

const serve = fn => listen(micro(fn));

test('filter', async t => {
  const app = rest(
    filter(({ resource: { id, filters, data }}) => ({ name: 'filter', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request(`${url}?hello=world`, { json: true });

  t.is(res.name, 'filter');
  t.is(res.id, undefined);
  t.deepEqual(res.filters, { hello: 'world' });
  t.deepEqual(res.data, {});
});

test('find', async t => {
  const app = rest(
    find(({ resource: { id, filters, data }}) => ({ name: 'find', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request(`${url}/id`, { json: true });

  t.is(res.name, 'find');
  t.is(res.id, 'id');
  t.deepEqual(res.filters, {});
  t.deepEqual(res.data, {});
});

test('create', async t => {
  const app = rest(
    create(({ resource: { id, filters, data }}) => ({ name: 'create', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request.post(`${url}`, {
    body: { hello: 'world' },
    json: true
  });

  t.is(res.name, 'create');
  t.is(res.id, undefined);
  t.deepEqual(res.filters, {});
  t.deepEqual(res.data, { hello: 'world' });
});

test('update', async t => {
  const app = rest(
    update(({ resource: { id, filters, data }}) => ({ name: 'update', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request.patch(`${url}/id`, {
    body: { hello: 'world' },
    json: true
  });

  t.is(res.name, 'update');
  t.is(res.id, 'id');
  t.deepEqual(res.filters, {});
  t.deepEqual(res.data, { hello: 'world' });
});

test('replace', async t => {
  const app = rest(
    replace(({ resource: { id, filters, data }}) => ({ name: 'replace', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request.put(`${url}/id`, {
    body: { hello: 'world' },
    json: true
  });

  t.is(res.name, 'replace');
  t.is(res.id, 'id');
  t.deepEqual(res.filters, {});
  t.deepEqual(res.data, { hello: 'world' });
});

test('destroy', async t => {
  const app = rest(
    destroy(({ resource: { id, filters, data }}) => ({ name: 'destroy', id, filters, data }))
  );

  const url = await serve(app);
  const res = await request.del(`${url}/id`, { json: true });

  t.is(res.name, 'destroy');
  t.is(res.id, 'id');
  t.deepEqual(res.filters, {});
  t.deepEqual(res.data, {});
});
