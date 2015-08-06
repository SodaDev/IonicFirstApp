/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').controller('RulesCtrl', ['eliteApi', function(eliteApi){
    var vm = this;
    vm.mainContent = {};

    eliteApi.getLeagueData().then(function(data){
        console.log(data.league);
        vm.mainContent = data.league.rulesScreen;
    })
}]);