const app = require('express')();

// app.use((req, res, next) => {
//   console.log(JSON.stringify(req.headers));
//   next();
// });

const cors = require('cors');
app.use(cors());

app.use(require('../middlewares/Token'));

app.post('/', async (req, res, next) => {
  try {
    // throw Error('abc');
    await res.send('post ok');
  } catch (e) {
    console.error(e);
    await next(e);
  }
});

app.get('/', (req, res) => {
  res.send('read ok');
});

app.get('/:id', (req, res) => {
  res.send('read ok' + req.params.id);
});

app.put('/:id', (req, res) => {
  res.send('put ok' + req.params.id);
});

app.delete('/:id', (req, res) => {
  res.send('delete ok' + req.params.id);
});

module.exports = app;
