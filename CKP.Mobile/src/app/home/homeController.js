
app.controller('homeController', [
                   '$scope', '$http', '$location', 'authService', 'localStorageService', '$timeout', 'homeDataService','parameterService', 'alerting', '$filter',
                   function($scope, $http, $location, authService, localStorageService, $timeout, homeDataService, parameterService, alerting, $filter) {
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
                       $scope.parameters = parameterService.getSearchParameters();
                       
                      $scope.selectParamter = function() {
                           parameterService.getSearchParameterName($scope.selectedPara)
                           $scope.searchParameterId = $scope.selectedPara;
                       }
                       $scope.languages =parameterService.getSearchParameters();
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
                           $scope.selectedPara = parameterService.getSearchParameterName(para);
                         
                           $scope.searchParameterId = para;
                       }
                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }
                       
                       $scope.orderList = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
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
                       
                       //
                       $scope.selection = [];
                       $scope.toggleSelection = function toggleSelection(so) {
                           var idx = $scope.selection.indexOf(so);
                           // is currently selected                          
                           if (idx > -1) {                           
                               $scope.selection.splice(idx, 1);                           
                           } else {                           
                               $scope.selection.push(so);                           
                           }                           
                       };
                       $scope.viewAll = function(orderType, parameterId) {
                           kendo.mobile.application.navigate("src/app/order/order.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + "" + "&orders=" + $scope.orders);
                       } 
                       $scope.approve = function() {
                           var salesorders = "";

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function(value, key) {                               
                               salesorders += value + ',';
                           });
                           kendo.mobile.application.navigate("src/app/order/approve.html?orders=" + salesorders);
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