
app.controller('helpController', ['$scope', '$http', '$sce',
    function ($scope, $http, $sce) {
       
        var content = '';
        $scope.renderHtml = function () {
            return $sce.trustAsHtml(content);
        };

    }
]);