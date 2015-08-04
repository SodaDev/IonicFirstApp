/**
 * Created by soda on 04/08/15.
 */
angular.module('eliteApp')
    .controller('teamDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
        $scope.currentTeam = $stateParams.id;
}]);