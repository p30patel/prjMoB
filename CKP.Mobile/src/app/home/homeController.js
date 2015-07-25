
app.controller('homeController', [
                   '$scope', '$http', '$location', 'authService', 'localStorageService', '$timeout', 'homeDataService',
                   function($scope, $http, $location, authService, localStorageService, $timeout, homeDataService) {
                       var init = function() {
                             
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                              
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                             
                       };
                       init();
                       $scope.title = 'home page';
                       $scope.message = "";
                       $scope.searchParamterId = 1;
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
                       var accessToken = "";
                       $scope.clearSearch = function() {
                           $scope.searchValue = "";
                       }
                       //translation

                       //retailers with count
                       $scope.orderCounts = {};

                       homeDataService.getOrderHeaderData().then(function (result) {
                           $scope.orders = result;
                       });

                       var getRecentOrderData = function () {
                           var authServerUri = "https://qachecknet.checkpt.com/webapi/api/core/MobileApp/GetRecentOrdersTaskAsync";
                           //var authServerUri = "http://localhost:62356/api/core/MobileApp/GetRecentOrdersTaskAsync";
                           var data = "retailerId=" + 6884 + "&orgId=" + 6884 + "&groupType=" + 'Retailer' + "&startRowIndex=" + 1 + "&maximumRows=" + 10;
                        
                           $.ajax({
                                      type: "Get",
                                      url: authServerUri,
                                      data: data,
                                      headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
                                      beforeSend: function (xhr) {
                                          xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                                          xhr.setRequestHeader('Access-Control-Allow-Origin', "*"); // added to remove the error No 'Access-Control-Allow-Origin' 
                                      },
                                      success: function (data) {
                                        //  alert(data.length);
                                          $scope.recentOrders = data;
                                      },
                                      error: function (jq, status, message) {
                                        //  alert(message);
                                      }
                                  });
                       };

                       var getRecentOrders = function () {
                           var authData = localStorageService.get('authorizationData');

                           if (authData) {
                               accessToken = authData.token;
                               getRecentOrderData();
                           } else {
                               Location.path('/login');
                           }
                       };

                       $scope.approvalDetail = function (id) {
                           $('.order').hide();

                           $('#approval-' + id).show();

                           $scope.activeTabId = '#approvalDetail-' + id;
                       };

                       var getOrderCounts = function () {
                            kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {
                               $scope.orderCounts = result;
                               $scope.message = "Completed Order Counts";
                                kendo.mobile.application.pane.loader.hide();
                               angular.element($scope.activeTabId).trigger('click');
                               if ($scope.activeTabId !== "") {
                                   angular.element($scope.activeTabId).trigger('click');
                               }
                           }
                               );
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
                           $scope.searchParamterId = para;
                       }
                       $scope.key = function ($event) {
                           console.log($event.keyCode);

                           if ($event.keyCode === 13) {
                               $scope.message = "Searching for " + $scope.selectedPara + " like  " + $scope.searchValue + "Para: " + $scope.searchParamterId;
                               $timeout(function () {
                                   getOrderCounts();
                               }, 1000);
                           }
                       }
                   }
               ]);