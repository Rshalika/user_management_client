var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authentication/middleware');
authenticate.authenticateUser;

router.post('/login', passport.authenticate('local'),function (req, res, next) {
      console.log('asdasd');
      res.send('sadsad');
    }
);

router.get('/test', authenticate, function (req, res, a) {
      res.send("guuud");
    }
);



module.exports = router;
