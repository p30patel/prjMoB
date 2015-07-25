(function (module) {

    var alerts = function (alerting) {
        return {
            restrict: "AE",
            templateUrl: "src/app/common/directives/alerts.html",
            scope: true,
            controller: function ($scope) {
                $scope.removeAlert = function (alert) {
                    alerting.removeAlert(alert);
                };
            },
            link: function (scope) {
                scope.currentAlerts = alerting.currentAlerts;
            }
        };
    };

    module.directive("alerts", alerts);

}(angular.module("app")));