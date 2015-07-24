var authServiceBase = 'https://qachecknet.checkpt.com/';
var clientId = 'Ckp.PoC1';

var app = angular.module('app',
['LocalStorageModule', 'kendo.directives'])
  .constant('ngAuthSettings', {
      authServiceBaseUri: authServiceBase,
     
      clientId: clientId
  });

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
