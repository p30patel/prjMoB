
app.controller('approveController', [
                   '$scope', 'authService', 'orderDataService', 'homeDataService','$sce', 'alerting',
                   function($scope, authService, orderDataService, homeDataService, $sce, alerting) {   
                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;
                       $scope.order.title = 'Approve Orders';
                       $scope.order.comment = "";
                       $scope.order.mesages = "";
                       $scope.salesorders = {};
                       $scope.order.hasUpdateStatus = false;
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       
                       var orders = "";
                       
                       $scope.intShow = function (e) {
                           $scope.orders = e.view.params.orders;  
                           orders = e.view.params.orders;                
                       }
                       //retailers with count
                 
                       //appprove order
                       $scope.apporve = function (statusUpdate) {
                           var salesorders = [];
                        
                           var salesorderList = orders.split(',');
                           angular.forEach(salesorderList, function(value, key) {
                               if (value !== '') {
                                   var solist = {
                                       SalesOrderNo: value,
                                       Comment: $scope.order.comment 
                                   };
                                   salesorders.push(solist);
                               }
                           });
                         
                           var jsonIn = {
                               UserName: "jim rl tjx",
                               OrgId: 6884,
                               RetailerId: 6884,
                               ApproveOrdersListData: salesorders
                           }
                           
                           orderDataService.approveDecline(jsonIn).then(function (result) {
                               $scope.order.detail = result;
                               alerting.addSuccess("Completed Approved/ Declined");
                               $scope.order.mesages = "Successfully Approve or Decline Orders!";
                               $scope.order.hasUpdateStatus = true;
                               kendo.mobile.application.pane.loader.hide();
                           }).catch(function (error) {
                               alerting.addSuccess("Faild to Approve or Decline!");
                               $scope.order.message = "Faild to Approve or Decline!";
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }

                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);