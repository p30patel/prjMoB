'use strict';
app.factory('authInterceptorService', ['$q', '$location','$injector',
'localStorageService', function ($q, $location, $injector, localStorageService) {


    var authInterceptorServiceFactory = {};
    var alerting = $injector.get("alerting");
    var request = function (config) {
          
        config.headers = config.headers || {};
        
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token ;
        }
       
        return config;
    }
       var response= function (response) {
  
            return response || $q.when(response);

        }

    var responseError = function (rejection) {
       
    console.log('current view : ' + kendo.mobile.application.view().id);
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                 //   $location.path('/refresh');
                         kendo.mobile.application.navigate("src/app/login/login.html");
                    return $q.reject(rejection);
                }
            }
            authService.logout();
             
            //$location.path('/login');
              kendo.mobile.application.navigate("src/app/login/login.html");

            alerting.addDanger("Un-Authorized Access, Please login to access!"  );
        }
        else if (rejection.status === 404) {
            alerting.addDanger("There is an error while proccessing this request. Error Code :" + 401  );
        }
        else if (rejection.status === 0) {
              kendo.mobile.application.navigate("src/app/login/login.html");
              alerting.addDanger("Server is unavailable. Please try later or contact customer service. Error Code :" + 0  );
            
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = request;
    authInterceptorServiceFactory.response = response;
    authInterceptorServiceFactory.responseError = responseError;

    return authInterceptorServiceFactory;
}]);