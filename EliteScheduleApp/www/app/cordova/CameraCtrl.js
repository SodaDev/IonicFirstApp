/**
 * Created by soda on 06/08/15.
 */
angular.module('eliteApp').controller('CameraCtrl', ['$cordovaCamera', function($cordovaCamera){
    var vm = this;

    vm.takePicture = function(){
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            vm.photo = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.err('Cordova camera error!');
        });
    };

    vm.selectPicture = function(){
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            vm.photo = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.err('Cordova camera error!');
        });
    }
}]);