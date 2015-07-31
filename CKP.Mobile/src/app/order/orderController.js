
 app.controller('orderController', [
                   '$scope', 'authService', 'orderDataService','$sce', 'alerting',
                   function($scope, authService, messageDataService, $sce, alerting) {
                       
                       $scope.order = {};
                       $scope.order.title = 'Order Detail';
                       
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                           
                       };
                       init();
                       var orderType = 1;
                       var parameterId = 0;
                       var parameterValue = "";
                       $scope.intShow =function (e)
                       {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue = e.view.params.parameterValue;
                           
                       }   
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
                      
                       $scope.messageClose = function() {
                           //  kendo.mobile.application.navigate("#:back");
                           kendo.mobile.application.navigate("src/app/home/home.html");
                       }
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                      
                   }
               ]);