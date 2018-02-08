const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

const returnIndex = (req, res, next) => {
  const options = {
    root: `${path.dirname(__dirname)}/public/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = 'index.html';
  res.sendFile(fileName, options, err => {
    if (err) {
      next(err);
    }
  });
};

server.get('/basket', returnIndex);
server.get(/^[\\\/][0-9]+$/, returnIndex);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
