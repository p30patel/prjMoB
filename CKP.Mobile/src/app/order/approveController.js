
app.controller('approveController', [
                   '$scope', 'authService', 'orderDataService', 'homeDataService','$sce', 'alerting',
                   function($scope, authService, orderDataService, homeDataService, $sce, alerting) {   
                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;
                       $scope.order.title = 'Approve Orders';
                       $scope.salesorders = {};
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                   
                       $scope.intShow = function (e) {
                           var orders = [];
                           $scope.orders = e.view.params.orders;                          
                       }
                       //retailers with count
                 
                       //appprove order
                       $scope.apporve = function (statusUpdate) {
                           var salesorders = [];
                           /*
                           var salesorderList = [1,2,3,4];
                           angular.forEach(salesorderList, function(value, key) {
                           var solist = {
                           SalesOrderNo: value,
                           Comment: "comment1"
                           };
                           salesorders.push(solist);
                           });*/
                           var solist = {
                               SalesOrderNo:$scope.order.detail.SalesOrderNo,
                               Comment: order.detail.comment
                           };
                           salesorders.push(solist);
                           var jsonIn = {
                               UserName: "jim rl tjx",
                               OrgId: 6884,
                               RetailerId: 6884,
                               ApproveOrdersListData: salesorders
                           }
                           
                           orderDataService.approveDecline(jsonIn).then(function (result) {
                               alert('Approval' + result.success);
                               $scope.order.detail = result;
                               alerting.addSuccess("Completed laoding order Details.");
                                 kendo.mobile.application.pane.loader.hide();
                           }).catch(function (error) {
                               $scope.mesages = "Faild to Approve or Decline!";
                                 kendo.mobile.application.pane.loader.hide();
                           });
                       }

                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);