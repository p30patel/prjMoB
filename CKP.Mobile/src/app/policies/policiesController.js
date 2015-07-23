
app.controller('policiesController', ['$scope', '$http', '$sce',
    function ($scope, $http, $sce) {
       
        var content = '<p>Checkpoint respects your privacy. Across our business, around the world, we will only collect, store and use your personal information for defined purposes. We use your information to support and enhance our relationship with you, for example, to process your purchase, provide service and support, and share product, service and company news and offerings with you.</p>';
        $scope.renderHtml = function () {
            return $sce.trustAsHtml(content);
        };

    }
]);