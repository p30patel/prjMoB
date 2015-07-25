app.controller('menuController', [
                   '$scope', 'authService', function($scope, authService) {
                       $scope.menu = {};
                       $scope.menu.title = 'Check-Net';
                       $scope.menu.contactus = "Contact Us";
                       $scope.menu.faq = "FAQ's";
                       $scope.menu.termsCondition = "Terms \& Conditions";
                       $scope.menu.policies = "Policies";
                       $scope.menu.help = "Help";
                       $scope.menu.notificationSettings = "Notification Settings";
                       $scope.menu.feedback = "Feedback";
                       
                       $scope.authentication = authService.authentication;

                       //logout
                       $scope.logout = function () {
                           authService.logout();
                           window.analytics.End();
                           kendo.mobile.application.navigate("src/app/login/login.html");
                       }
                       $scope.mnuClick = function(viewName) {
                           switch (viewName) {
                               case "login":
                                    kendo.mobile.application.navigate("src/app/login/login.html");
                                   break;
                               default :
                                   kendo.mobile.application.navigate("src/app/login/login.html");
                                   break;
                           }
                       }
                   }
               ]);
