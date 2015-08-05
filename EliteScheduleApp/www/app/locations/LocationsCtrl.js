/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .controller('LocationsCtrl', ['$scope', 'eliteApi', function ($scope, eliteApi) {
        var vm = this;
        vm.locations = eliteApi.getLeagueData().locations;
    }]);