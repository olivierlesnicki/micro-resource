const { json } = require('micro')
const { router, del, get, patch, put, post } = require('microrouter');

const action = (name, method, path) => ({ name, method, path });
const actions = [
  action('filter', get, '/'),
  action('find', get, '/:id'),
  action('create', post, '/'),
  action('update', patch, '/:id'),
  action('replace', put, '/:id'),
  action('destroy', del, '/:id')
];

const actionFn = action => handler => {
  return action.method(action.path, async (req, res) => {
    const id = req.params.id;
    const filters = req.query;
    let data = {};

    if (action.method == patch || action.method == post || action.method == put) {
      data = await json(req);
    }

    const resource = { id, filters, data };

    return handler(Object.assign({}, req, { resource }), res);
  });
};

actions.forEach(action => {
  exports[action.name] = actionFn(action)
});

exports.rest = router;
