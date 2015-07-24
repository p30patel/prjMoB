
'use strict';

app.factory("indexDataService",
    ["$http", "$q", "localStorageService", "ngAuthSettings", "authService", "$location",
function ($http, $q, localStorageService, ngAuthSettings, authService, $location) {

    var authServiceBase = ngAuthSettings.authServiceBaseUri;

    var indexDataServiceFactory = {};

    var forceGetMessages = function (retailerId) {
        var deferred = $q.defer();
        var authData = authService.getUserInfo();

        // var authServerUri = "http://localhost:62356/api/core/MobileApp/GetMessagesTaskAsync?retailerId=" + 6884 + "&client_id=" + 'Ckp.PoC';

        // $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetMessagesTaskAsync?retailerId=' + 6884, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': authData.tokenType + authData.token } }).success(function (result) {

        $http.get(authServiceBase + 'webapi/api/core/MobileApp/GetHolidaysTaskAsync?retailerId=' + 6884).success(function (result) {
            deferred.resolve(result);
        })
                        .error(function (err, status) {
                            deferred.reject(err);
                        });
        return deferred.promise;
    };
    var getMessages = function (retailerId) {
        var deferred = $q.defer();

        var messages = localStorageService.get("messages");
        if (messages) {
            deferred.resolve(messages);
        }
        else {
            forceGetMessages(retailerId).then(function (result) {
                deferred.resolve(result);
            });
        }

        return deferred.promise;
    }

    indexDataServiceFactory.getMessages = getMessages;
    indexDataServiceFactory.forceGetMessages = forceGetMessages;

    return indexDataServiceFactory;
}]);