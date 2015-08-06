/**
 * Created by soda on 06/08/15.
 */
angular.module('eliteApp')
    .controller('VibrationCtrl', ['$cordovaVibration', function ($cordovaVibration) {
        var vm = this;

        vm.vibrate = function(){
            console.log('vibration');
            $cordovaVibration.vibrate(1000);
        }

    }]);