/**
 * Created by soda on 04/08/15.
 */
angular.module('eliteApp')
    .controller('teamDetailCtrl', ['$scope', '$stateParams', 'eliteApi', '$ionicPopup', 'myTeamsService',
                            function($scope, $stateParams, eliteApi, $ionicPopup, myTeamsService){
        var vm = this;

        vm.teamId = Number($stateParams.id);

        eliteApi.getLeagueData().then(function(data){
            var team = _.chain(data.teams)
                .pluck("divisionTeams")
                .flatten()
                .find({"id": vm.teamId})
                .value();

            vm.teamName = team.name;
            vm.games = _.chain(data.games)
                .filter(isTeamInGame)
                .map(function(item){
                    var isTeam1 = item.team1Id === vm.teamId;
                    var opponentName = isTeam1 ? item.team2 : item.team1;
                    var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);

                    return {
                        gameId: item.id,
                        opponent: opponentName,
                        time: item.time,
                        location: item.location,
                        locationUrl: item.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? "vs. " : "at")
                    }
                }).value();

            vm.teamStanding = _.chain(data.standings)
                .pluck('divisionStandings')
                .flatten()
                .find({'teamId': vm.teamId})
                .value();

            vm.following = myTeamsService.isFollowingTeam(team.id);
            vm.toggleFollow = function(){
                if(vm.following){
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Unfollow?',
                        template: 'Are you sure you want to unfollow ' + vm.teamName + '?'
                    });
                    confirmPopup.then(function(res){
                        if(res){
                            vm.following = !vm.following;
                            myTeamsService.unFollowTeam(team);
                        }
                    })
                } else {
                    vm.following = !vm.following;
                    myTeamsService.followTeam(team);
                }
            };
        });

        function isTeamInGame(item){
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        };

        function getScoreDisplay(isTeam1, team1Score, team2Score){
            if(team1Score && team2Score){
                var teamScore = isTeam1 ? team1Score : team2Score;
                var opponentScore = isTeam1 ? team2Score : team1Score;
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
        };
}]);