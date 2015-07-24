'use strict';
app.factory('authInterceptorService', ['$q', '$location','$injector',
'localStorageService', function ($q, $location, $injector, localStorageService) {


    var authInterceptorServiceFactory = {};

    var request = function (config) {
       
        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token ;
        }

        return config;
    }

    var responseError = function (rejection) {
        var alerting = $injector.get("alerting");
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }
            authService.logout();
             
            $location.path('/login');

            alerting.addDanger("Un-Authorized Access, Please login to access!"  );
        }
        else if (rejection.status === 404) {
            alerting.addDanger("There is an error while proccessing this request. Error Code :" + 401  );
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = request;
    authInterceptorServiceFactory.responseError = responseError;

    return authInterceptorServiceFactory;
}]);