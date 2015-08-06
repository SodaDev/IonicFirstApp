/**
 * Created by soda on 06/08/15.
 */
angular.module('eliteApp').controller('DialogsCtrl', ['$cordovaDialogs', function($cordovaDialogs){
    var vm=this;

    vm.alert = function(){
        $cordovaDialogs.alert('Wow!', 'Alert Title', 'Dismiss').then(alertClosed);
    };

    vm.confirm = function(){
        $cordovaDialogs.confirm('Are you sure?', 'Confirmation', ['Yes', 'No', 'Maybe']).then(confirmClosed);
    };

    vm.prompt =function(){
        $cordovaDialogs.prompt('Please login', 'Login', ['Login', 'Cancel']).then(promptClosed);
    };

    vm.beep = function(){
        $cordovaDialogs.beep(3);
    };

    function alertClosed(){
        $cordovaDialogs.alert("Alert was closed");
    }

    function confirmClosed(buttonIndex){
        $cordovaDialogs.alert("Button selected: " + buttonIndex);
    }

    function promptClosed(results){
        $cordovaDialogs.alert("Selected button number: " + results.buttonIndex + " and entered " + results.input1);
    }
}]);