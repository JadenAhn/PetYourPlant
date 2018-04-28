/* camera.js
* Final Project
*
*   Revision History
*       Aubrey Delong, 2018.04.18 : Created
*       Jaden Ahn, 2018.04.20 : Added targetWidth
*/

function captureEditablePhotoToAdd() {

    var options = {
        quality: 50,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA
    };

    function onSuccess(imageData) {
        var profileImg = $("#profileImg");
        var imgSrc = "data:image/jpeg;base64," + imageData;
        profileImg.attr('src', imgSrc);
    }

    function onFail(error) {
        alert("Failed because of: " + error.message);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}

function captureEditablePhotoToEdit() {

    var options = {
        quality: 50,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA
    };

    function onSuccess(imageData) {
        var profileImg = $("#profileImgEdit");
        var imgSrc = "data:image/jpeg;base64," + imageData;
        profileImg.attr('src', imgSrc);
    }

    function onFail(error) {
        alert("Failed because of: " + error.message);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}