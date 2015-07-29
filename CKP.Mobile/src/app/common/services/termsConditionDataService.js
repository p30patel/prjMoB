
'use strict';

app.factory("termsConditionDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var termsConditionDataServiceFactory = {};

                    var forceGetTermsCondition = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;
                        var authData = authService.getUserInfo();
                        var cultureName = "en-US";

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetTermsAndConditions?cultureName=' + cultureName).success(function (result) {
                            localStorageService.set('termsCondition', result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getTermsCondition = function () {
                        var deferred = $q.defer();

                        var termsCondition = localStorageService.get("termsCondition");
                        termsCondition = '';
                        if (termsCondition) {
                            deferred.resolve(policies);
                        } else {
                            forceGetTermsCondition().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    termsConditionDataServiceFactory.getTermsCondition = getTermsCondition;
                    termsConditionDataServiceFactory.forceGetTermsCondition = forceGetTermsCondition;

                    return termsConditionDataServiceFactory;
                }
            ]);