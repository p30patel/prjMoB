app.controller('menuController', [
                   '$scope', function($scope) {
                       $scope.menu = {};
                       $scope.menu.title = 'Check-Net';
                       $scope.menu.contactus = "Contact Us";
                       $scope.menu.faq = "FAQ's";
                       $scope.menu.termsCondition = "Terms \& Conditions";
                       $scope.menu.policies = "Policies";
                       $scope.menu.help = "Help";
                       $scope.menu.notificationSettings = "Notification Settings";
                       $scope.menu.feedback = "Feedback";
                   }
               ]);