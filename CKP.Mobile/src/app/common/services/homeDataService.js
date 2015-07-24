
'use strict';

app.factory("homeDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings",
                function ($http, $q, localStorageService, ngAuthSettings) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;
                    var homeDataServiceFactory = {};

                    var forceGetOrderCounts = function () {
                        var deferred = $q.defer();
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetMessageListTaskAsync?userId=" + 1;
                        $http.get(url).success(function (result) {
                            alert(result.length);
                            localStorageService.set('orderCount', result);
                            deferred.resolve(result);
                        }).error(function (err, status) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    };

                    var getOrderCounts = function () {
                        var deferred = $q.defer();
          
                        var orderCountData = localStorageService.get('orderCount');
          
                        if (orderCountData) {
                            deferred.resolve(orderCountData);
                        } else {
                            forceGetOrderCounts().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    };

                    var forceGetOrderHeaderData = function () {
                        var deferred = $q.defer();
            
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderHeaderDataTaskAsync?userId=" + 1 + "&client_id=" + ngAuthSettings.clientId;
                        $http.get(url).success(function (result) {
                            localStorageService.set('orderHeaderData', result);
                            deferred.resolve(result);
                        }).error(function (err, status) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    };

                    var getOrderHeaderData = function () {
                        var deferred = $q.defer();

                        var orderHeaderData = localStorageService.get('orderHeaderData');

                        if (orderHeaderData) {
                            deferred.resolve(orderHeaderData);
                        } else {
                            forceGetOrderHeaderData().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    };

                    homeDataServiceFactory.getOrderCounts = getOrderCounts;
                    homeDataServiceFactory.forceGetOrderCounts = forceGetOrderCounts;

                    homeDataServiceFactory.getOrderHeaderData = getOrderHeaderData;
                    homeDataServiceFactory.forceGetOrderHeaderData = forceGetOrderHeaderData;

                    return homeDataServiceFactory;
                }
            ]);