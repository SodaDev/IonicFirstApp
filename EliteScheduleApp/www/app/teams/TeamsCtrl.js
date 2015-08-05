/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').controller('TeamsCtrl', ['$scope', 'eliteApi', function($scope, eliteApi){
    var vm = this;

    eliteApi.getLeagueData().then(function(data){
        vm.teams = data.teams;
    });

    console.log(vm.teams);
}]);