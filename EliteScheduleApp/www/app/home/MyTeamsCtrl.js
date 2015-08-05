/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').controller('MyTeamsCtrl', ['$state', 'myTeamsService', 'eliteApi',
                                              function($state, myTeamsService, eliteApi){
    var vm = this;

    vm.myTeams = myTeamsService.getFollowedTeams();

    vm.goToTeam = function(team){
        eliteApi.setLeagueId(team.leagueId);
        $state.go('app.team-detail', { id: team.id });
    }
}]);