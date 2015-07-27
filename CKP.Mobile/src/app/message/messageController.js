app.controller('messageController', [
                   '$scope', 'authService', 'messageDataService',
                   function($scope, authService, messageDataService) {
                     
                        $scope.title = 'News & Alerts';
                     
                       //messages                    
                       $scope.mesages = {};
                       //modal
                       
                       var getMessages = function () {
                         
                           var retailerId = 6884;
                        
                           messageDataService.getMessages(retailerId).then(function (result) {
                               $scope.mesages = (result.length > 0) ? result : '';
                               $scope.showMessageModal = !$scope.showMessageModal;
                           }).catch(function(error) {
                               $scope.mesages = '';
                           }).finally(function() {
                           });
                       }; // end message
                       getMessages();
                          $scope.messageClose = function(){
                        
                             //  kendo.mobile.application.navigate("#:back");
                              kendo.mobile.application.navigate("src/app/home/home.html");
                              
                       }
                    
                   }
               ]);