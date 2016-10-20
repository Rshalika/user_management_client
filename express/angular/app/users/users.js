'use strict';


function User (username, password) {
  var self = this;
  this.username = username;
  this.password = password;
  function getUsernae() {
    return self.username;
  }
}


angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/users', {
        templateUrl: 'users/users.html',
        controller: 'UsersCtrl'
      });
    }])

    .controller('UsersCtrl', function($scope) {
      $scope.users = [];
      $scope.users.push(new User("rezo","p"));
      $scope.users.push(new User("rezo","p"));
      $scope.users.push(new User("rezo","p"));
      $scope.users.push(new User("rezo","p"));
    });