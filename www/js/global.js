/* global.js
* Final Project
*
*   Revision History
*       Jaden Ahn, 2018.04.09 : Created
*/

var isCameraReady = false;


function document_deviceready() {
    isCameraReady = true;
}

function btnCapturePhoto_click() {
    if (isCameraReady) {
        captureEditablePhotoToAdd();
    }
    else{
        alert("Camera is not ready");
    }
}

function btnCapturePhotoEdit_click() {
    if (isCameraReady) {
        captureEditablePhotoToEdit();
    }
    else{
        alert("Camera is not ready");
    }
}

function addPlantDeathCheck_change() {
    if ($("#addPlantDeathCheck").is(":checked")) {
        $("#addPlantDeathDateDetail").show();
    }
    else {
        $("#addPlantDeathDateDetail").hide();
    }
}

function editPlantDeathCheck_change() {
    if ($("#editPlantDeathCheck").is(":checked")) {
        $("#editPlantDeathDateDetail").show();
    }
    else {
        $("#editPlantDeathDateDetail").hide();
    }
}

function btnAddPlant_click() {
    addPlant();
}

function btnUpdatePlant_click() {
    updatePlant();
}

function btnDeletePlant_click(){
    var result = confirm("Do you REALLY want to delete plant profile?");
    if(result){
        deletePlant();
    }
}

function btnClearDatabase_click() {
    DB.dropTables();
    localStorage.setItem("isDataInserted", "false");
}

function btnAddSchedule_click() {
    addSchedule();
}

function btnUpdateSchedule_click() {
    updateSchedule();
}

function btnDeleteSchedule_click(){
    var result = confirm("Do you REALLY want to delete this schedule?");
    if(result){
        deleteSchedule();
    }
}

function addProgressionPhoto_click() {
    alert("Working!");
}

function plantPage_show() {
    getAllPlants();
}

function showPlantPage_show() {
    getPlantToShow();
}

function btnEditPlant_click() {
    getPlantToEdit();
}

function schedulePage_show() {
    getAllSchedules();
}


function btnEditSchedule_click() {
    getScheduleToEdit();
}


function addPlantSearchMotherPage_show() {
    addPlantGetAllMothers();
}

function editPlantSearchMotherPage_show() {
    editPlantGetAllMothers();
}

function addScheduleSearchPlantPage_show() {
    addScheduleGetAllPlants();
}

function editScheduleSearchPlantPage_show() {
    editScheduleGetAllPlants();
}

function showSchedulePage_show() {
    getScheduleToShow();
}

function btnAddUser_click() {
    checkForExistingUser();
}

function btnLogin_click() {
    validateLogin();
}

function homePage_show(){
    getNotifications();
    getUserName();
    getSuggestion();
}

function btnLogout_click(){
    logoutUser();
}

function accountSettingsPage_show(){
    showAccountSettings();
}

function btnUpdateUser_click() {
    updateUserAcountSettings();
}

function btnDeleteUser_click() {
    var result = confirm("Do you REALLY want to delete your account information?");
    if(result){
        var SecondResult = confirm("You cannot restore deleted information. ARE YOU SURE?");
        if (SecondResult) {
            alert("Thank you for using our app. =)");
            deleteUser();
        }
    }
}

function btnAdminLogin_click() {
    adminLogin();
}

function btnBack_click(){
    resetRegisterPageInputs();
}

function init() {
    $(document).on("deviceready", document_deviceready);
    $("#btnCapturePhoto").on("click", btnCapturePhoto_click);
    $("#btnCapturePhotoEdit").on("click", btnCapturePhotoEdit_click);
    // $("#btnLoadFromPhotoLibrary").on("click", btnLoadFromPhotoLibrary_click);

    $("#btnAddPlant").on("click", btnAddPlant_click);
    $("#btnUpdatePlant").on("click", btnUpdatePlant_click);
    $("#btnEditPlant").on("click", btnEditPlant_click);
    $("#btnDeletePlant").on("click", btnDeletePlant_click);
    $("#addProgressionPhoto").on("click", addProgressionPhoto_click);

    $("#btnAddSchedule").on("click", btnAddSchedule_click);
    $("#btnUpdateSchedule").on("click", btnUpdateSchedule_click);
    $("#btnEditSchedule").on("click", btnEditSchedule_click);
    $("#btnDeleteSchedule").on("click", btnDeleteSchedule_click);

    $("#btnDeleteUser").on("click", btnDeleteUser_click);

    $("#addPlantDeathCheck").on("change", addPlantDeathCheck_change);
    $("#editPlantDeathCheck").on("change", editPlantDeathCheck_change);


    $("#plantPage").on("pageshow", plantPage_show);
    $("#showPlantPage").on("pageshow", showPlantPage_show);
    $("#addPlantSearchMotherPage").on("pageshow", addPlantSearchMotherPage_show);
    $("#editPlantSearchMotherPage").on("pageshow", editPlantSearchMotherPage_show);

    $("#schedulePage").on("pageshow", schedulePage_show);
    $("#showSchedulePage").on("pageshow", showSchedulePage_show);
    $("#addScheduleSearchPlantPage").on("pageshow", addScheduleSearchPlantPage_show);
    $("#editScheduleSearchPlantPage").on("pageshow", editScheduleSearchPlantPage_show);

    $("#accountSettingsPage").on("pageshow", accountSettingsPage_show);

    $("#homePage").on("pageshow", homePage_show);

    $("#btnAddUser").on("click", btnAddUser_click);
    $("#btnLogin").on("click", btnLogin_click);
    $("#btnLogout").on("click", btnLogout_click);
    $("#btnUpdateUser").on("click", btnUpdateUser_click);
    $("#btnBack").on("click", btnBack_click);

    $("#btnClearDatabase").on("click", btnClearDatabase_click);
    $("#btnAdminLogin").on("click", btnAdminLogin_click);

    addPlantDeathCheck_change();
    editPlantDeathCheck_change();
}

function initDB() {
    console.info("Creating Database ...");
    try {
        DB.createDatabase();
        if (db) {
            DB.createTables();
        }
        else {
            console.error("Error: Cannot create tables : Database not available");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});