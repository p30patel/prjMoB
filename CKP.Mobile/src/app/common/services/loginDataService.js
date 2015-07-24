app.factory('loginDataService',
    ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {
        var authServiceBase = ngAuthSettings.authServiceBaseUri;
        var loginDataFactory = {};

        var forceGetLanguages = function () {

            var deferred = $q.defer();
            var url = authServiceBase + "webapi/api/core/Languages/Get";
            $http.get(url).success(function(result) {
                localStorageService.set('languageData', result);
                deferred.resolve(result);
            }).error(function (err, status) {
               
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var getLanguages = function () {
            var deferred = $q.defer();

            var languageData = localStorageService.get('languageData');
         
            if (languageData) {
                deferred.resolve(languageData);
            }
            else {
                forceGetLanguages().then(function (result) {
                    deferred.resolve(result);
                });
            }

            return deferred.promise;
        }


        var getPasswordHint = function (username) {

            var deferred = $q.defer();
            var url = authServiceBase + "webapi/api/core/MobileApp/GetPasswordHint?username=" + username ;
            $http.get(url).success(function (result) {
                deferred.resolve(result);

            }).error(function (err, status) {
                deferred.reject('Faild to retrieve password hint!' + err);
            });
            return deferred.promise;
        };
        var resetPassword = function (username, email) {

            var deferred = $q.defer();
            var url =  authServiceBase + "webapi/api/core/MobileApp/Resetpassword?username=" + username + "&email=" + email;
            $http.post(url).success(function(result) {
                deferred.resolve(result);

            }).error(function(err, status) {
                deferred.reject(err, status);

            }).catch(function (err) {
                deferred.reject(err);
               
            });
            return deferred.promise;
        };


        loginDataFactory.getLanguages = getLanguages;
        loginDataFactory.forceGetLanguages = forceGetLanguages;
        loginDataFactory.getPasswordHint = getPasswordHint;
        loginDataFactory.resetPassword = resetPassword;

        return loginDataFactory;
    }
]);