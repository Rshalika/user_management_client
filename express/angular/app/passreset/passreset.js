'use strict';

angular.module('myApp.reset', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/reset', {
            templateUrl: 'passreset/passreset.html',
            controller: 'ResetCtrl'
        });
    }])

    .controller('ResetCtrl', function($scope, $http) {
        var serverUrl = "http://localhost:3000/users/changepassword";
        $scope.username = '';
        $scope.old = '';
        $scope.newPass='';
        $scope.confirm='';
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        $scope.submit = function () {
            var data = {
                username: $scope.username,
                old: $scope.old,
                newPass:$scope.newPass,
                confirm:$scope.confirm
            };
            $http.post(serverUrl,data,config).then(function (response) {
                console.log(response);
            })
        }

    });