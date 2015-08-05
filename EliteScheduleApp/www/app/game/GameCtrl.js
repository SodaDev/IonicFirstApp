/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .controller('GameCtrl', ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
        var vm = this;
        var gameId = Number($stateParams.id);
        eliteApi.getLeagueData().then(function(data){
            vm.game = _.find(data.games, {id: gameId});
        });
    }]);