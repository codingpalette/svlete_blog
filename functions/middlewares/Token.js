const admin = require('firebase-admin');

module.exports = (req, res, next) => {
  // console.log(JSON.stringify(req.headers));
  console.log(JSON.stringify(req.headers));
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(function(decodedToken) {
      req.claims = decodedToken;
      next();
    })
    .catch(function(e) {
      // Handle error
      console.log(e.message);
      res.status(401).send();
    });
};
