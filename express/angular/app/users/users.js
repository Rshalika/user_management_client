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
        $scope.users = [];
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
        }

    });