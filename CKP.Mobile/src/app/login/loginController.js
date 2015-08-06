'use strict';
app.controller('loginController', [
                   '$scope', '$http', '$location', 'authService', 'translateService', 'localStorageService',  'loginDataService', '$q','$timeout','alerting','$filter',
                   function ($scope, $http, $location, authService, translateService, localStorageService, loginDataService, $q, $timeout, alerting, $filter) {
                       $scope.title = 'Login';
                       alerting.addDanger("Please Login");
                     
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
                       
                       $scope.loginData = {
                           userName: "",
                           password: "",
                       };
                       $scope.translations = {};
                       $scope.message = "";
                       //forgot password 
                       
                       $scope.forgotPasswordModalOpen = function () {
                           $scope.loginData.email = "";
                           $("#modalview-forgotpassword").kendoMobileModalView("open"); 
                       };
                       $scope.closeModalViewForgotPassword = function() {
                           $("#modalview-forgotpassword").kendoMobileModalView("close"); 
                       };
                       
                       $scope.sendPassword = function () {
                           kendo.mobile.application.pane.loader.show();
                           var username = 'rjmarshallca'; //for test - else use  $scope.loginData.userName;
                           var email = $scope.loginData.email;
                           loginDataService.resetPassword(username, email).then(function(result) {
                               alerting.addSuccess(result);
                               kendo.mobile.application.pane.loader.hide();
                               $("#modalview-forgotpassword").kendoMobileModalView("close"); 
                           },
                                                                                function (err) {
                                                                                    alerting.addSuccess(err.error_description);
                                                                                    kendo.mobile.application.pane.loader.hide();
                                                                                    $("#modalview-forgotpassword").kendoMobileModalView("close"); 
                                                                                });
                       };
                       //end forgot password
                       
                       var loginData = {
                           userName : '',
                           password: '',
                           remmberme : false                        
                           
                       };

                       var languages = function () {
                           $scope.languages = [{ Name: "English", Culture: "en-US", Id: 1, Error: "" }];
       
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
                           var selectedLanguage = localStorageService.get('selectedLanguage');
        
                           if (selectedLanguage) {
                               $scope.selectedLanague = selectedLanguage;
                           } else {
                               $scope.selectedLanague = 'en-US';
                           }
                           //set user name pass if set remmber on.
                           var loginData = localStorageService.get('loginData');
     
                           if (loginData) {
                               if (loginData.remmberme) {
                                   $scope.loginData.userName = loginData.userName;
                                   $scope.loginData.password = loginData.password;
                                   $scope.loginData.useRefreshTokens = loginData.remmberme
                               }
                           } else {
                               $scope.loginData.userName = ""
                               $scope.loginData.password = "";
                               $scope.loginData.useRefreshTokens = false;
                           }
                       };
                       languages(); //init languages
                                        
                       //trsnasaltion
                       var data = [{ resourceName: "login", resourceValue: "" }];

                       $scope.translatePage = function() {
                           var translateData = {
                               pageName : 'Login',
                               selectedLanague: $scope.selectedLanague
                           };
                           localStorageService.set('selectedLanguage', $scope.selectedLanague);
                           
                           translateService.getTranslation(translateData).then(function() {
                               $scope.form.login.resoruceValue = translateService.getTranslationByName($scope.form.login.resoruceName);
                               $scope.form.username.resoruceValue = translateService.getTranslationByName($scope.form.username.resoruceName);
                               $scope.form.password.resoruceValue = translateService.getTranslationByName($scope.form.password.resoruceName);
                               $scope.form.passwordHint.resoruceValue = translateService.getTranslationByName($scope.form.passwordHint.resoruceName);
                               $scope.form.signin.resoruceValue = translateService.getTranslationByName($scope.form.signin.resoruceName);
                               $scope.form.remmberMe.resoruceValue = translateService.getTranslationByName($scope.form.remmberMe.resoruceName);
                           });
                       }

                       //loign event
                       $scope.login = function () {
                           var loginData = {
                               userName : $scope.loginData.userName,
                               password:  $scope.loginData.password,
                               remmberme : $scope.loginData.useRefreshTokens               
                           }
                           localStorageService.set('loginData', loginData);
                           
                           kendo.mobile.application.pane.loader.show();
                           
                           $scope.passwordHint = "";
                           authService.login($scope.loginData).then(function (response) {
                               kendo.mobile.application.pane.loader.hide();
                               kendo.mobile.application.navigate("src/app/home/home.html");
                           }).catch(function(err) {
                               $scope.message = err.error_description;
                               alerting.addDanger(err.error_description);                     
                               kendo.mobile.application.pane.loader.hide();
                           });
                       };

                       $scope.showPasswordHint = function () {
                           kendo.mobile.application.pane.loader.show();
                           var username = $scope.loginData.userName;
                           loginDataService.getPasswordHint(username).then(function (result) {
                               $scope.passwordHint = result;
                               alerting.addSuccess('Hint is : ' + result);
                               kendo.mobile.application.pane.loader.hide();
                           }).catch(function(err) {
                               $scope.message = 'Error while getting the Hint!';
                               alerting.addDanger('Error while getting the Hint!');                     
                               kendo.mobile.application.pane.loader.hide();
                           });
                       };
                   }
               ]);