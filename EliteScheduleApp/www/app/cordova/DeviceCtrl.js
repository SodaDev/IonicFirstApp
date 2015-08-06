/**
 * Created by soda on 06/08/15.
 */
angular.module('eliteApp').controller('DeviceCtrl', ['$cordovaDevice', function($cordovaDevice){
    var vm = this;
    vm.infos = [];

    function addInfo(type, value){
        vm.infos.push({
            type: type,
            value: value
        })
    }
    document.addEventListener("deviceready", function () {
        addInfo('manufacturer', $cordovaDevice.getManufacturer());
        addInfo('model', $cordovaDevice.getModel());
        addInfo('uuid', $cordovaDevice.getUUID());
        addInfo('platform', $cordovaDevice.getPlatform());
        addInfo('platform version', $cordovaDevice.getVersion());
        addInfo('cordova version', $cordovaDevice.getCordova());
    }, false);
}]);