app.controller('menuController', [
                   '$scope', 'authService', 'menuDataService',
                   function($scope, authService, menuDataService) {
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
                       //messages                    
                       $scope.mesages = {};
                       //modal
                       $scope.showMessageModal = false;
                       $scope.messageModalToggle = function () {
                           var retailerId = 6884;
                           if (!$scope.showMessageModal) {
                               menuDataService.getMessages(retailerId).then(function (result) {
                                   $scope.mesages = (result.length > 0) ? result : '';
                                   $scope.showMessageModal = !$scope.showMessageModal;
                               }).catch(function(error) {
                                   $scope.mesages = '';
                               }).finally(function() {
                               });
                           }
                       }; // end message
                       
                       //logout
                       $scope.logout = function () {
                           authService.logout();
                          
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