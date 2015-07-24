'use strict';
app.controller('loginController',
        ['$scope', '$http', '$location', 'authService', 'translateService', 'localStorageService',  'loginDataService', '$q','$timeout',
function ($scope, $http, $location, authService, translateService, localStorageService, loginDataService, $q, $timeout) {
   
    //login page html lables
    $scope.form = {};
    $scope.form.login = {};
    $scope.form.login.resoruceName = "login";
    $scope.form.login.resoruceValue = "login";
    $scope.form.username = {};
    $scope.form.username.resoruceName = "user name";
    $scope.form.username.resoruceValue = "user name";
    $scope.form.password = {};
    $scope.form.password.resoruceName = "password";
    $scope.form.password.resoruceValue = "password";

    $scope.form.forgotPassword = {};
    $scope.form.forgotPassword.resoruceName = "forgot password";
    $scope.form.forgotPassword.resoruceValue = "forgot password";

    $scope.form.passwordHint = {};
    $scope.form.passwordHint.resoruceName = "password hint";
    $scope.form.passwordHint.resoruceValue = "password hint";

    $scope.form.signin = {};
    $scope.form.signin.resoruceName = "signin";
    $scope.form.signin.resoruceValue = "signin";

    $scope.form.remmberMe = {};
    $scope.form.remmberMe.resoruceName = "remmber me";
    $scope.form.remmberMe.resoruceValue = "remmber me";
    //end page html 

    $scope.languages = {};
    $scope.passwordHint = "";


    //forgot password 
    $scope.forgotpassword = {};

    //modal
    $scope.showModal = false;
    $scope.forgotPasswordModalToggle = function () {
        $scope.showModal = !$scope.showModal;

        $scope.forgotpassword.message = "";
        $scope.forgotpassword.email = "";
    };


    var languages = function () {
       
        $scope.languages = [{ Name: "English", Culture: "en-US", Id: 1, Error: "" }];;
       
        var languageData = localStorageService.get('languageData');
        
        if (languageData) {
            $scope.languages = languageData;
            loginDataService.getLanguages().then(function(response) {
                $scope.languages = response;
            });
        } else {
            loginDataService.forceGetLanguages().then(function (result) {
                $scope.languages = result;
            });
        }


    };
    languages(); //init langguages

    $scope.loginData = {
        userName: "",
        password: ""
    };
    $scope.translations = {};

    //trsnasaltion
    var data = [{ resourceName: "login", resourceValue: "" }];

    $scope.translatePage = function() {
        var translateData = {
            pageName : 'Login',
            selectedLanague: $scope.selectedLanague
    };
        $scope.translations = translateService.getTranslation(translateData);

        $scope.form.login.resoruceValue = translateService.getTranslationByName($scope.form.login.resoruceName);
        $scope.form.username.resoruceValue = translateService.getTranslationByName($scope.form.username.resoruceName);
        $scope.form.password.resoruceValue = translateService.getTranslationByName($scope.form.password.resoruceName);
        $scope.form.passwordHint.resoruceValue = translateService.getTranslationByName($scope.form.passwordHint.resoruceName);
        $scope.form.signin.resoruceValue = translateService.getTranslationByName($scope.form.signin.resoruceName);
        $scope.form.remmberMe.resoruceValue = translateService.getTranslationByName($scope.form.remmberMe.resoruceName);
    }

    //loign event
    $scope.login = function () {
      
        $('#isLoading').show();
        $scope.passwordHint = "";
        authService.login($scope.loginData).then(function (response) {
            $location.path('/home');

        },
            function (err) {
                $scope.message = err.error_description;
            }).finally(function () {
                $('#isLoading').hide();
            });
    };

    $scope.showPasswordHint = function () {
        $('#isLoading').show();
        var username = $scope.loginData.userName;
        loginDataService.getPasswordHint(username, email).then(function (result) {
            $scope.passwordHint = result;
            $('#isLoading').hide();
        });
     
    };
 
    $scope.sendPassword = function () {
        $('#isLoading').show();
        var username = 'rjmarshallca'; //for test - else use  $scope.loginData.userName;
        var email = $scope.forgotpassword.email;
        loginDataService.resetPassword(username, email).then(function(result) {
            $scope.forgotpassword.message = result;
       
        },
            function (err) {
                    $scope.forgotpassword.message = err.error_description;;
            }).finally(function () {
                $('#isLoading').hide();
            });
    };
}]);