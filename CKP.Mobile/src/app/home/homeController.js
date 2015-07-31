
app.controller('homeController', [
                   '$scope', '$http', '$location', 'authService', 'localStorageService', '$timeout', 'homeDataService', 'alerting', '$filter',
                   function($scope, $http, $location, authService, localStorageService, $timeout, homeDataService, alerting, $filter) {
                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               alerting.addSuccess("Please Login!");
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       $scope.title = 'Home';
                       $scope.message = "";
                       $scope.searchParameterId = 1;
                       $scope.activeTabId = "";

                       var getSelectedPara = function(para) {
                           var selectedPara = "Purchase Order";
                           switch (para) {
                               case '1':
                                   selectedPara = "Purchase Order";
                                   break;
                               case '2':
                                   selectedPara = "Sales Order";
                                   break;
                               case '3':
                                   selectedPara = "Shopping Cart";
                                   break;
                               case '4':
                                   selectedPara = "Vendor Ref";
                                   break;
                               default:
                                   selectedPara = "Purchase Order";
                                   break;
                           }
                           return selectedPara;
                       }

                       $scope.selectedPara = getSelectedPara('1');
                      
                       $scope.clearSearch = function() {
                           $scope.searchValue = "";
                       }
                       //translation

                       //retailers with count
                       $scope.orderCounts = {};

                       homeDataService.getOrderHeaderData().then(function (result) {
                           $scope.orders = result;
                           alerting.addSuccess("Completed Order Data Header Request!");
                       });
                      
                       $scope.approvalDetail = function (id) {
                           $('.order').hide();

                           $('#approval-' + id).show();

                           $scope.activeTabId = '#approvalDetail-' + id;
                       };

                       var getOrderCounts = function () {
                           alerting.addSuccess("Getting Order Counts!");
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {
                               $scope.orderCounts = result;
                               alerting.addSuccess("Completed Order Counts Request!");
                             
                               angular.element($scope.activeTabId).trigger('click');
                               if ($scope.activeTabId !== "") {
                                   angular.element($scope.activeTabId).trigger('click');
                               }
                           }
                               ).finally(function() {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                       }
                       getOrderCounts();

                       $scope.newOrderDetail = function (id) {
                           $('.order').hide();
                           $('#new-' + id).show();
                           $scope.activeTabId = '#newOrderDetail-' + id;
                       };

                       $scope.releaseOrderDetail = function (id) {
                           $('.order').hide();

                           $('#released-' + id).show();
                           $scope.activeTabId = '#releaseOrderDetail-' + id;
                       };
                       $scope.collapse = function (id) {
                           $('.order').hide();
                           $('.retailer').removeClass('active');
                           $('.retailer-' + id).removeClass('active');
                           $scope.activeTabId = "";
                       };

                       $scope.setSearhParamter = function (para) {
                           $scope.selectedPara = getSelectedPara(para);
                           $scope.searchParameterId = para;
                       }
                       $scope.orderDetail = function (orderType, parameterId, parameterValue){
                        
                               kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + order +"&parameterId=" + selectedParameterId + "&parameterValue=" + parameterValue);
                       }
                       $scope.key = function ($event) {
                           console.log($event.keyCode);

                           if ($event.keyCode === 13) {
                               //$scope.message = "Searching for " + $scope.selectedPara + " like  " + $scope.searchValue + "Para: " + $scope.searchParamterId;
                               alerting.addSuccess("Searching ....");
                               $timeout(function () {
                                   getOrderCounts();
                               }, 1000);
                           }
                       }

                       //pull to refresh
                       $scope.refresh = function() {
                           var currentDate = $filter('date')(new Date(), 'dd-MMM-yy HH:mm:ss');
                           alerting.addSuccess("Last updated " + currentDate);
                           $timeout(function() {
                               $scope.scroller.pullHandled();
                           }, 400);
                       };  //pull to refresh end
                   }

               ]);