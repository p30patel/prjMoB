
'use strict';

app.factory("faqDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var faqDataServiceFactory = {};

                    var forceGetFaqs = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;                        
                        var cultureName = "en-US";

                        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetFaq?cultureName=' + cultureName).success(function (result) {
                          
                            localStorageService.set('faqs', result);
                            deferred.resolve(result);
                        })
                            .error(function (err, status) {
                                deferred.reject(err);
                            });
                        return deferred.promise;
                    };
                    var getFaqs = function () {
                        var deferred = $q.defer();

                        var faqs = localStorageService.get("faqs");
                       
                        if (faqs) {
                            deferred.resolve(faqs);
                        } else {
                            forceGetFaqs().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }

                    faqDataServiceFactory.getFaqs = getFaqs;
                    faqDataServiceFactory.forceGetFaqs = forceGetFaqs;

                    return faqDataServiceFactory;
                }
            ]);