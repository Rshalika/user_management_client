'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl',
            css:'login.login.css'
        });
    }])

    .controller('LoginCtrl', function($scope, $http,$location,$timeout) {
        var serverUrl = "http://localhost:3000/login";
        $scope.username = '';
        $scope.password = '';


        console.log($scope.username);

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'            }
        };
        $scope.submit = function () {
            var data = $.param({
                username: $scope.username,
                password: $scope.password
            });
            $http.post(serverUrl,data,config).then(function (response) {
                if (response.status == 200){
                    $timeout(function(){
                        $location.path("/users");
                    });

                }
            })
        }

    });