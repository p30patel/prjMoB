
app.controller('orderController', ['$scope', '$http', '$sce', '$routeParams',
    function($scope, $http, $sce, $routeParams) {
        $scope.title = $routeParams.searchParamter + ' Detail: ';
        $scope.searchParamter = $routeParams.searchParamter;
        $scope.searchValue = $routeParams.id;

       
        $scope.orders =
        [{ OrderNumber: 'PO1', SalesOrder: 12345, Date: Date.now(), VemdorRef: 'VendorRef1', ShoppingCart: 12345, Status: "Open" },
        { OrderNumber: 'PO2', SalesOrder: 12346, Date: Date.now(), VemdorRef: 'VendorRef2', ShoppingCart: 12346, Status: "Close" },
        { OrderNumber: 'PO3', SalesOrder: 12347, Date: Date.now(), VemdorRef: 'VendorRef3', ShoppingCart: 12347, Status: "Printed" },
        { OrderNumber: 'PO4', SalesOrder: 12348, Date: Date.now(), VemdorRef: 'VendorRef4', ShoppingCart: 12348, Status: "Shipped" },
        { OrderNumber: 'PO5', SalesOrder: 12349, Date: Date.now(), VemdorRef: 'VendorRef5', ShoppingCart: 12349, Status: "Close" },
        { OrderNumber: 'PO6', SalesOrder: 12350, Date: Date.now(), VemdorRef: 'VendorRef6', ShoppingCart: 123410, Status: "Close" }];
    }
]);

