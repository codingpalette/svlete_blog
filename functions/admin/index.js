const app = require('express')();
const cors = require('cors');
const admin = require('firebase-admin');
const db = admin.firestore();
app.use(cors());

app.use(require('../middlewares/Token'));

app.get('/users', async (req, res) => {
  if (req.claims.level > 0) return res.status(403).send({ message: '권환이 없습니다.' });
  const s = await db.collection('users').get();
  const r = {
    items: [],
    totalCount: s.size
  };
  s.forEach(v => r.items.push(v.data()));
  // res.send(items);
  res.send(r);
});

module.exports = app;
