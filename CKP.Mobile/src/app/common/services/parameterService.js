app.factory('parameterService', [
                '$http', '$q', 'localStorageService', 'ngAuthSettings',
                function ($http, $q, localStorageService, ngAuthSettings) {
                    var service = {};
                    var searchParameters = [
                        { id: '1', name : "Purchase Order"},
                        { id: '2', name : "Sales Order"},
                        { id: '3', name : "Shopping Cart"},
                        { id: '4', name : "Vendor Ref"},
            
                    ];
                    
                      var orderTypes = [
                        { id: '1', name : "Approval"},
                        { id: '2', name : "New"},
                        { id: '3', name : "Released"}                  
            
                    ];


                    var getSearchParameters = function () {
                        return searchParameters;
                    }
        
                    var getSearchParameterName = function (id) {
                        var paramterName = "Purchase Order";
                        angular.forEach(searchParameters, function (item) {
                            if (item.id === id) {
                                paramterName = item.name;
                                return paramterName;
                            }
                        });
                        return paramterName;
                    }
                    
                    
                    var getOrderTypes = function () {
                        return orderTypes;
                    }
        
                    var getOrderTypeName = function (id) {
                        var paramterName = "Released";
                        angular.forEach(orderTypes, function (item) {
                            if (item.id === id) {
                                paramterName = item.name;
                                return paramterName;
                            }
                        });
                        return paramterName;
                    }
                    service.getSearchParameters = getSearchParameters;
                    service.getSearchParameterName = getSearchParameterName;
                    
                    service.getOrderTypes = getOrderTypes;
                    service.getOrderTypeName = getOrderTypeName;

                    return service;
                }
            ]);