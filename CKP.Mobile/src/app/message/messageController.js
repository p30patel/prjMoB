app.controller('messageController', [
                   '$scope', 'authService', 'messageDataService','$sce', 'alerting',
                   function($scope, authService, messageDataService, $sce, alerting) {
                       $scope.title = 'News & Alerts';
                     
                       //messages                    
                       $scope.mesages = {};
                       //modal
                       
                       var getMessages = function () {
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Getting Messages..");
                           messageDataService.getMessages().then(function (result) {
                               $scope.mesages = result;
                               alerting.addSuccess("Completed loading messages.");
                           }).catch(function(error) {
                               $scope.mesages = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }; // end message
                       getMessages();
                       $scope.messageClose = function() {
                           //  kendo.mobile.application.navigate("#:back");
                           kendo.mobile.application.navigate("src/app/home/home.html");
                       }
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                      
                   }
               ]);