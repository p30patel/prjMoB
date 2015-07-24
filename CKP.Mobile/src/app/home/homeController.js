app.controller('homeController', [
                   '$scope', 'authService', function($scope, authService) {
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alert('logout');
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       $scope.title = 'home page';
                       $scope.a = function() {
                       }
                       $scope.aa = function(e) {
                           alert('aa');
                       }
                   }
               ]) 