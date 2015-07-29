
'use strict';

app.factory("indexDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
                function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {
                    var authServiceBase = ngAuthSettings.authServiceBaseUri;

                    var indexDataServiceFactory = {};


                    return indexDataServiceFactory;
                }
            ]);