'use strict';




angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', function($scope,$http, $timeout) {
        var serverUrl = 'http://localhost:3000/users';
        var serverUrlPrivs = 'http://localhost:3000/users/privs';
        $scope.users = [];
        $scope.editing = false;
        $scope.newUser = {};
        $scope.newUser.username="";
        $scope.newUser.password="";
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };


        $scope.update = function(){
            $http.get(serverUrl, config).then(function (response) {
                var data = response.data;
                console.log(response);
                $scope.users = [];
                // for (var i = 0 ; i  < data.length; i ++){
                //     data[i].privs = JSON.parse(data[i].privileges);
                // }
                $scope.users = data;

            });
        };

        $scope.update();

        $scope.create = function () {
            var data = {
                username: $scope.newUser.username,
                password:$scope.newUser.password
            };

            $http.post(serverUrl,data,config).then(function (response) {
                $scope.update();
            })
        };
        $scope.currentUserName = {};

        $scope.onEditClick = function (userid) {
            $scope.currentUserName = userid;
            $scope.editing = true;
        };

        $scope.onEditSave = function () {
            $scope.editing = false;

            var user = $scope.currentUserName,
                username  = user.username;
            var data = {
                username: username,
                privs: user.privilegesF
            };

            $http.post(serverUrlPrivs,data,config).then(function (response) {
                $scope.update();
            })
        }

    });