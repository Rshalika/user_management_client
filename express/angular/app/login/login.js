'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl',
            css:'login.login.css'
        });
    }])

    .controller('LoginCtrl', function($scope, $http) {
        var serverUrl = "http://localhost:3000/user";
        $scope.username = "";
        $scope.password = '';
        var data = {
            fName: $scope.username,
            lName: $scope.password
        };

        var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        };
        $scope.submit = function () {
            $http.post(serverUrl,data,config).then(function (response) {
                console.log(response);
            })
        }

    });