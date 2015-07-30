
app.controller('feedbackController', [
                   '$scope', '$http', '$sce', 'feedbackDataService', 'alerting', 'authService',
                   function ($scope, $http, $sce, feedbackDataService, alerting, authService) {
                       $scope.feedbackData = {};                       
                       $scope.feedbackData.webpage = "Mobile App";
                       $scope.feedbackData.comment = "";
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                           
                       };
                       init();
                    
                       $scope.send = function() {
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Sending feedback data to server..");
                         
                           feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
                               if (result === 'success') {
                                   alerting.addSuccess("Thank you for your feedback!");
                                   $scope.feedbackData.comment = "";
                               } else {
                                   alerting.addSuccess("Faild to post feedback!");
                               }
                           }).catch(function(error) {
                               $scope.policies = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }
                   }
               ]);