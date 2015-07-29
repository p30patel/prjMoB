
app.controller('termsConditionController', [
                   '$scope', '$http', '$sce', 'termsConditionDataService', 'alerting',
                   function ($scope, $http, $sce, termsConditionDataService, alerting) {
                       $scope.termsCondition = {};
                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Getting  terms and Condition....");
                           termsConditionDataService.getTermsCondition().then(function (result) {
                               $scope.termsCondition = result;
                               alerting.addSuccess("Completed loading terms and Condition.");
                           }).catch(function(error) {
                               $scope.termsCondition = {};
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