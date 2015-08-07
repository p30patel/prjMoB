
app.controller('orderlistController', [
                   '$scope', 'authService', 'orderDataService', 'homeDataService','$sce', 'alerting',
                   function($scope, authService, orderDataService,homeDataService, $sce, alerting) {   
                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;
                       $scope.order.title = 'Order List';
                       $scope.order.detail = {};
                       $scope.order.orders = {};
                       var init = function() {
                           
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var parameterValue = "";
                      
                       $scope.intShow = function (e) {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue = e.view.params.parameterValue;                          
                          
                           $scope.order.message = orderType + ";" + parameterId + ":" + parameterValue;
                              $scope.order.title = 'Shopping Cart Detail';
                              $scope.order.orderType = orderType;
                              $scope.searchParameterId = parameterId;
                         
                           if (orderType === '1'){
                                  $scope.order.hasApproval = true;
                           }
                           getOrderList();
                       }
                        //retailers with count
                   


                       homeDataService.getOrderHeaderData().then(function (result) {
                           $scope.order.orders = result;
                           alerting.addSuccess("Completed Order Data Header Request!");
                       });
                        var getOrderList = function () {
                            
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Getting Order list..");
                           orderDataService.getOrderList().then(function (result) {
                               $scope.order.list = result;
                               alerting.addSuccess("Completed loading order list.");
                           }).catch(function(error) {
                               $scope.mesages = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }; // end message
                     //appprove order
                         $scope.selection=[];
                       $scope.toggleSelection = function toggleSelection(so) {
                           var idx = $scope.selection.indexOf(so);
                                                     // is currently selected                          
                           if (idx > -1) {                           
                               $scope.selection.splice(idx, 1);                           
                           } // is newly selected                           
                           else {                           
                               $scope.selection.push(so);                           
                           }                           
                       };
                       
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);