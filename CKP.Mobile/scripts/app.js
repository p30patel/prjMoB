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
  (function (g) {

	var productId = "d7464702a97c4d9389e316daca91db9d"; // App unique product key
   
	// Make analytics available via the window.analytics variable
	// Start analytics by calling window.analytics.Start()
	var analytics = g.analytics = g.analytics || {};
    
	analytics.Start = function () {
      
		// Handy shortcuts to the analytics api
		var factory = window.plugins.EqatecAnalytics.Factory;
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		// Create the monitor instance using the unique product key for Analytics
		var settings = factory.CreateSettings(productId);
		settings.LoggingInterface = factory.CreateTraceLogger();
		factory.CreateMonitorWithSettings(settings,
		  function () {
		  	console.log("Monitor created");
		  	// Start the monitor inside the success-callback
		  	monitor.Start(function () {
		  		console.log("Monitor started");
		  	});
		  },
		  function (msg) {
            
		  	console.log("Error creating monitor: " + msg);
		  });
	}
	analytics.Stop = function () {
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		monitor.Stop();
	}
	analytics.Monitor = function () {
		return window.plugins.EqatecAnalytics.Monitor;
	}
})(window);
window.analytics.Start();
