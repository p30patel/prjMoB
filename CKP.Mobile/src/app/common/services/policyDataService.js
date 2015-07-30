
'use strict';

app.factory("policyDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var policyDataServiceFactory = {};

                    var forceGetPolicies = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authData = authService.getUserInfo();
                        var cultureName = "en-US";

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/getPolicies?cultureName=' + cultureName).success(function (result) {
                            localStorageService.set('policies', result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getPolicies = function () {
                        var deferred = $q.defer();

                        var policies = localStorageService.get("policies");
                      
                        if (policies) {
                            deferred.resolve(policies);
                        } else {
                            forceGetPolicies().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    policyDataServiceFactory.getPolicies = getPolicies;
                    policyDataServiceFactory.forceGetPolicies = forceGetPolicies;

                    return policyDataServiceFactory;
                }
            ]);