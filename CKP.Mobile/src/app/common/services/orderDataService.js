
'use strict';

app.factory("orderDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var orderDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd");
                    
                    var forceGetOrderDetail = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderHeaderDetailTaskAsync?searchText=" + 'testorder' + "&client_id=" + ngAuthSettings.clientId;
                        $http.get(url).success(function (result) {
                            localStorageService.set('orderDetail' + date, result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {                                  
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    var getOrderDetail = function () {
                        var deferred = $q.defer();
                        
                        var orderDetail = localStorageService.get("orderDetail" + date);
                        orderDetail = '';
                        if (orderDetail) {
                            deferred.resolve(orderDetail);
                        } else {
                            forceGetOrderDetail().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }
                    
                     var forceGetOrderList = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                         var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderHeaderDataTaskAsync?userId=" + userId + "&client_id=" + ngAuthSettings.clientId;
                        $http.get(url).success(function (result) {
                            localStorageService.set('orderList' + date, result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {  
                            
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    var getOrderList = function () {
                        var deferred = $q.defer();
                        
                        var orderList = localStorageService.get("orderList" + date);
                        orderList = '';
                        if (orderList) {
                            deferred.resolve(orderList);
                        } else {
                            forceGetOrderList().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }
                    
                    
                     var approveDecline = function (data) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                        var url = authServiceBase + "webapi/api/core/MobileApp/UpdateApproveOrderList";
                        $http.post(url, data).success(function (result) {   
                            alert(result.success);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {                           
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };


                    orderDataServiceFactory.approveDecline = approveDecline;
                    
                    orderDataServiceFactory.getOrderDetail = getOrderDetail;
                    orderDataServiceFactory.forceGetOrderDetail = forceGetOrderDetail;
                    
                    orderDataServiceFactory.getOrderList = getOrderList;
                    orderDataServiceFactory.forceGetOrderList = forceGetOrderList;

                    return orderDataServiceFactory;
                }
            ]);