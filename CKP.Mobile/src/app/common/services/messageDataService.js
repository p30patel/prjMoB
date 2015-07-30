
'use strict';

app.factory("messageDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var messageDataServiceFactory = {};
                     var date = kendo.toString(new Date(), "yyyy-MM-dd");

                    var forceGetMessages = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                      
                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetMessageListTaskAsync?userId=' + userId).success(function (result) {
                              localStorageService.set('messages' + date, result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getMessages = function () {
                        var deferred = $q.defer();
                        
                        var messages = localStorageService.get("messages" + date);
                        if (messages) {
                            deferred.resolve(messages);
                        } else {
                            forceGetMessages().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    messageDataServiceFactory.getMessages = getMessages;
                    messageDataServiceFactory.forceGetMessages = forceGetMessages;

                    return messageDataServiceFactory;
                }
            ]);