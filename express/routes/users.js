var express = require('express');
var router = express.Router();
var authenticate = require('../authentication/middleware');
authenticate.authenticateUser;
var client = require('../client/backendclient');

router.get('/', authenticate, function(req, res, next) {
  client.getAllUsers(function (err, users) {
    if (err){
      res.statusCode(400).end();
      return;
    }
    res.send(users);
  })
});

router.post('/', authenticate, function(req, res, next) {
  var username = res.get('username');
  var password = res.get('password');
  client.createUser({username:username,password:password},function (err, users) {
    if (err){
      res.statusCode(400).end();
      return;
    }
    res.send(users);
  })
});

router.delete('/', authenticate, function(req, res, next) {
  var username = res.get('username');
  client.deleteUser({username:username},function (err, users) {
    if (err){
      res.statusCode(400).end();
      return;
    }
    res.send(users);
  })
});
router.delete('/privs', authenticate, function(req, res, next) {
  var privs = res.get('privs');
  client.changePrivilegies({username:username},privs,function (err, users) {
    if (err){
      res.statusCode(400).end();
      return;
    }
    res.send(users);
  })
});






module.exports = router;
