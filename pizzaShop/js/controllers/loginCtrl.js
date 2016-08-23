app.controller('LoginCtrl', function ($rootScope, $scope, $state, $http, loginService) {

    $scope.regexName = /^[A-z0-9]{3,20}$/;
    $scope.regexPassword = /^[A-z0-9]{3,20}$/;

    $scope.isLogin = $rootScope.isLogin;

    $scope.login = function () {
        loginService.login($scope.name, $scope.password);
    };
});