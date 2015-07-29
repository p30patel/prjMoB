
app.controller('policyController', [
                   '$scope', '$http', '$sce', 'policyDataService', 'alerting',
                   function ($scope, $http, $sce, policyDataService, alerting) {
                       $scope.policies = {};
                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Getting Policies...");
                           policyDataService.getPolicies().then(function (result) {
                               $scope.policies = result;
                               alerting.addSuccess("Completed loading Policies.");
                           }).catch(function(error) {
                               $scope.policies = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }
                       init();
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);