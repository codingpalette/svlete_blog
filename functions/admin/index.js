const app = require('express')();

// app.use((req, res, next) => {
//   console.log(JSON.stringify(req.headers));
//   next();
// });
const cors = require('cors');
app.use(cors());

app.use(require('../middlewares/Token'));

app.get('/users', (req, res) => {
  if (req.claims.level > 0)
    return res.status(403).send({ message: '권환이 없습니다.' });
  res.send(req.claims);
});

module.exports = app;
