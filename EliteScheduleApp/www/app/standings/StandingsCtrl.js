/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').controller('StandingsCtrl', ['$scope', 'eliteApi', function($scope, eliteApi){
    var vm = this;

    eliteApi.getLeagueData().then(function(data){
        vm.standings = data.standings;
    });

}]);