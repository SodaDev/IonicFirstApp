/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .controller('LeaguesCtrl', ['$scope', 'eliteApi', '$state', function ($scope, eliteApi, $state) {
        var vm = this;

        eliteApi.getLeagues().then(function(data){
            vm.leagues = data;
        });

        vm.selectLeague = function(leagueId){
            eliteApi.setLeagueId(leagueId);
            $state.go('app.teams');
        }
    }]);