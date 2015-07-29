
app.controller('helpController', ['$scope', '$http', '$sce',
    function ($scope, $http, $sce) {
       
        var content = "Comming Soon";
        $scope.renderHtml = function () {
            return $sce.trustAsHtml(content);
        };

    }
]);
