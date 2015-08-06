/**
 * Created by soda on 06/08/15.
 */
angular.module('eliteApp').controller('NetworkCtrl', ['$cordovaNetwork', function($cordovaNetwork) {
    var vm = this;
vm.type = 'wifi'
    document.addEventListener("deviceready", function () {
        vm.type = $cordovaNetwork.getNetwork();
        vm.isOnline = $cordovaNetwork.isOnline();
    }, false);
}]);