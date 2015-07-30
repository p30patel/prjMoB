
app.controller('faqController', [
                   '$scope', '$http', '$sce', 'faqDataService', 'alerting',
                   function ($scope, $http, $sce, faqDataService, alerting) {
                       $scope.faqs = {};
                       var init = function() {
                           kendo.mobile.application.pane.loader.show();
                           alerting.addSuccess("Getting Faqs list..");
                           faqDataService.getFaqs().then(function (result) {
                               $scope.faqs = result;
                               alerting.addSuccess("Completed loading faqs list.");
                           }).catch(function(error) {
                               $scope.faqs = {};
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