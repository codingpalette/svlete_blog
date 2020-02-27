const app = require('express')();
const cors = require('cors');
const admin = require('firebase-admin');
const db = admin.firestore();
app.use(cors());

app.use(require('../middlewares/Token'));

app.get('/users', async (req, res) => {
  if (req.claims.level > 0) return res.status(403).send({ message: '권환이 없습니다.' });
  let { offset, limit } = req.query;
  offset = Number(offset);
  limit = Number(limit);
  const r = {
    items: [],
    totalCount: 0
  };
  const t = await db
    .collection('infos')
    .doc('users')
    .get();
  r.totalCount = t.data().counter;
  const s = await db
    .collection('users')
    .offset(offset)
    .limit(limit)
    .get();

  s.forEach(v => r.items.push(v.data()));
  // res.send(items);
  res.send(r);
});

module.exports = app;
