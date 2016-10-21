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

router.post('/privs', authenticate, function(req, res, next) {
  var privs = res.get('privs');
  client.changePrivilegies({username:username},privs,function (err, users) {
    if (err){
      res.statusCode(400).end();
      return;
    }
    res.send(users);
  })
});

router.post('/changepassword', function(req, res, next) {
  var user = {};
  user.username = req.body.username;
  user.old = req.body.old;
  user.newPass = req.body.newPass;
  user.confirm = req.body.confirm;

  client.adminChangePassword(user, function (err, users) {
    if (err) {
      res.statusCode(400).end();
      return;
    }
    res.status(200).end();
  });

});


router.post('/userprivs', authenticate, function(req, res, next) {
  var user = {};
  user.username = res.get('username');

  client.getUserPrivs(user, function (err, result) {
    if (err) {
      res.statusCode(400).end();
      return;
    }
    res.status(200).send(result.data);
  });

});













module.exports = router;
