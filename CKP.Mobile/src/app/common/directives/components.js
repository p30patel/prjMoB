
app.directive('modal', function () {
    return {
        template: '<div class="modal fade in">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value === true) {
                    $(element).modal('show');
                } else {
                    $(element).modal('hide');
                }
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {

                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
})

app.directive('tabs', function () {
      return {
          restrict: 'E',
          transclude: true,
          scope: {},
          controller: ["$scope", function ($scope) {
              var panes = $scope.panes = [];

              $scope.select = function (pane) {
                  angular.forEach(panes, function (pane) {
                      pane.selected = false;
                  });
                  pane.selected = true;
              }

              this.addPane = function (pane) {
                  if (panes.length === 0) $scope.select(pane);
                  panes.push(pane);
              }
          }],
          template:
            '<div class="tabbable">' +
              '<ul class="nav nav-tabs">' +
                '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                  '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                '</li>' +
              '</ul>' +
              '<div class="tab-content" ng-transclude></div>' +
            '</div>',
          replace: true
      };
  })

app.directive('pane', function () {
      return {
          require: '^tabs',
          restrict: 'E',
          transclude: true,
          scope: { title: '@' },
          link: function (scope, element, attrs, tabsCtrl) {
              tabsCtrl.addPane(scope);
          },
          template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
          replace: true
      };
  })