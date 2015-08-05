/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .controller('LeaguesCtrl', ['$scope', 'eliteApi', '$state', function ($scope, eliteApi, $state) {
        var vm = this;
        vm.leagues = eliteApi.getLeagues();

        vm.selectLeague = function(leagueId){
            $state.go('app.teams');
        }
    }]);