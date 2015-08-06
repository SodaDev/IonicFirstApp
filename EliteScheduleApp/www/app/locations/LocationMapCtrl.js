/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').controller('LocationMapCtrl', ['$scope', '$stateParams', 'eliteApi',
    function ($scope, $stateParams, eliteApi) {
    var vm = this;

    $scope.map = {
        center: {
            latitude: 38.897677,
            longitude: -77.036530
        },
        zoom: 12
    };
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 38.897677,
            longitude: -77.036530
        }
    };
    $scope.locationClicked = function(marker){
        console.log(marker);
        window.location.href = "geo:" + marker.coords.latitude + "," + marker.coords.longitude;
    };

    vm.locationId = Number($stateParams.id);
    eliteApi.getLeagueData().then(function (data) {
        var currentLocation = _.find(data.locations, {id: vm.locationId});
        $scope.map.center.latitude = currentLocation.latitude;
        $scope.map.center.longitude = currentLocation.longitude;

        $scope.marker = {
            id: 1,
            coords: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            },
            options: {
                draggable: true,
                labelContent: currentLocation.name + "<br/>(Tap for directions)",
                labelClass: "marker-labels"
            }
        };
    });
}]);