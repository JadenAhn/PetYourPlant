/* facade.js
* Final Project
*
*   Revision History
*       Jaden Ahn, 2018.04.09 : Created
*       Jaden Ahn, 2018.04.20 : Added validation
*/

function addPlantUpdateTypeDropdown() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            var selected = "";
            htmlCode += "<option value='" + row['id'] + "'" + selected +
                ">" + row['typeName'] + "</option>";
        }

        var combobox = $("#addPlantTypeCombo");
        combobox = combobox.html(htmlCode);
        combobox.selectmenu("refresh");
    }

    Type.selectAll(options, callback);
}

function editPlantUpdateTypeDropdown() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            var selected = "";
            htmlCode += "<option value='" + row['id'] + "'" + selected +
                ">" + row['typeName'] + "</option>";
        }

        var combobox = $("#editPlantTypeCombo");
        combobox = combobox.html(htmlCode);
        combobox.selectmenu("refresh");
    }

    Type.selectAll(options, callback);
}

function addPlant() {
    if (doValidate_frmAddPlant()) {
        var ownerId = localStorage.getItem("currentUser");
        var plantName = $("#addPlantName").val();
        var typeId = $("#addPlantTypeCombo").val();
        var plantDate = $("#addPlantDate").val();
        var isDead = $("#addPlantDeathCheck").prop("checked");
        var deathDate = $("#addPlantDeathDate").val();
        var motherId = $("#addPlantMotherId").val();
        var plantDesc = $("#addPlantDesc").val();

        var img = document.getElementById("profileImg");
        var canvas = document.createElement("canvas");
        canvas.id = "addPlantCanvas";
        canvas.width = 128;
        canvas.height = 128;
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);

        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Draw image to fit canvas size
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var photo = canvas.toDataURL("image/png");

        var options = [ownerId, plantName, photo, typeId, plantDate, isDead, deathDate, motherId, plantDesc];

        function callback() {
            console.info("Success: Record inserted successfully");
            alert("New Plant Profile Added");
            $.mobile.changePage("#plantPage", {transition: 'none'});
        }

        Plant.insert(options, callback);

        var canvas = document.getElementById("addPlantCanvas");
        var context = canvas.getContext("2d");
        //Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        var oldCanvas = document.getElementById("addPlantCanvas");
        oldCanvas.parentElement.removeChild(oldCanvas);
        var profileImg = $("#profileImg");
        profileImg.attr("src", "img/defaultImg.png");
    }
    else {
        console.error("Validation failed");
    }
}

function updatePlant() {
    if (doValidate_frmEditPlant()) {
        var plantId = localStorage.getItem("plantId");
        var ownerId = 1;
        var plantName = $("#editPlantName").val();
        var typeId = $("#editPlantTypeCombo").val();
        var plantDate = $("#editPlantDate").val();
        var isDead = $("#editPlantDeathCheck").prop("checked");
        var deathDate = $("#editPlantDeathDate").val();
        var motherId = $("#editPlantMotherId").val();
        var plantDesc = $("#editPlantDesc").val();

        var img = document.getElementById("profileImgEdit");
        var canvas = document.createElement("canvas");
        canvas.id = "editPlantCanvas";
        canvas.width = 128;
        canvas.height = 128;
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);

        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Draw image to fit canvas size
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var photo = canvas.toDataURL("image/png");

        var options = [ownerId, plantName, photo, typeId, plantDate, isDead, deathDate, motherId, plantDesc, plantId];

        function callback() {
            alert("Plant profile Updated");
            console.info("Success: Record inserted successfully");
            $.mobile.changePage("#plantPage", {transition: 'none'});
        }

        Plant.update(options, callback);

        var canvas = document.getElementById("editPlantCanvas");
        var context = canvas.getContext("2d");
        //Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        var oldCanvas = document.getElementById("editPlantCanvas");
        oldCanvas.parentElement.removeChild(oldCanvas);
    }
    else {
        console.error("Validation failed");
    }
}

function deletePlant() {

    var id = localStorage.getItem("plantId");
    var options = [id];

    function callback() {
        console.info("Success: plant record deleted successfully.");
        $.mobile.changePage("#plantPage", {transition: 'none'});
    }

    Plant.delete(options, callback);
}

function getPlantToShow() {
    var plantId = localStorage.getItem("plantId");
    var options = [plantId];

    function callback(tx, results) {
        var row = results.rows[0];
        var plantDate = getFormattedDate(new Date(row['plantDate']));
        var deathDate = row['deathDate'];

        if (row['isDead'] == "false") {
            deathDate = "Present";
        } else {
            deathDate = getFormattedDate(new Date(row['deathDate']));
        }

        var typeOption = [row['typeId']]
        Type.select(typeOption)

        $("#showPlantName").text(row['plantName']);
        $("#showPlantDate").text(plantDate);
        $("#showPlantDeathDate").text(deathDate);
        var img = document.getElementById("showPlantProfileImg");
        img.src = row['photo'];

        $("#showPlantDesc").text(row['plantDesc']);
        showPlantGetType(row['typeId']);

        if (row['motherId'] == null || row['motherId'] == "") {
            $("#showPlantMother").text("-");
        } else {
            showPlantGetMotherName(row['motherId']);
        }
    }

    Plant.select(options, callback);
}


function getPlantToEdit() {
    $.mobile.changePage("#editPlantPage", {transition: 'none'});
    var plantId = localStorage.getItem("plantId");
    var options = [plantId];

    editPlantUpdateTypeDropdown();

    function callback(tx, results) {
        var row = results.rows[0];
        var typeOption = [row['typeId']]
        Type.select(typeOption)

        $("#editPlantName").val(row['plantName']);
        $("#editPlantDate").val(row['plantDate']);

        var img = document.getElementById("profileImgEdit");
        img.src = row['photo'];

        $("#editPlantTypeCombo").val(row['typeId']);
        $("#editPlantTypeCombo").selectmenu("refresh");

        if (row['isDead'] == 'true') {
            $("#editPlantDeathCheck").prop("checked", true);
        }
        else {
            $("#editPlantDeathCheck").prop("checked", false);
        }

        $("#editPlantDeathCheck").checkboxradio("refresh");
        $("#editPlantDeathDate").val(row['deathDate']);
        editPlantDeathCheck_change();

        $("#editPlantDesc").text(row['plantDesc']);

        if (row['motherId'] == null || row['motherId'] == "") {
            $("#editPlantMotherName").text("");
        } else {

            editPlantGetMotherName(row['motherId']);
        }
    }

    Plant.select(options, callback);
}


function showPlantGetType(typeId) {
    var options = [typeId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#showPlantType").text(row['typeName']);
    }

    Type.select(options, callback);
}

function showPlantGetMotherName(motherId) {
    var options = [motherId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#showPlantMother").text(row['plantName']);
    }

    Plant.select(options, callback);
}

function addPlantGetMotherName(motherId) {
    var options = [motherId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#addPlantMotherName").val(row['plantName']);
    }

    Plant.select(options, callback);
}

function editPlantGetMotherName(motherId) {
    var options = [motherId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#editPlantMotherName").val(row['plantName']);
    }

    Plant.select(options, callback);
}

function getAllPlants() {
    $('#frmAddPlant')[0].reset();
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];

    function callback(tx, results) {
        var htmlCode = "";
        htmlCode += "<li><a href='#addPlantPage' class='ui-btn ui-btn-icon-left ui-icon-plus'><h3>Add a new plant</h3></a></li>";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var plantDate = getFormattedDate(new Date(row['plantDate']));
            var deathDate = row['deathDate'];

            if (row['isDead'] == "false") {
                deathDate = "Present";
            } else {
                deathDate = getFormattedDate(new Date(row['deathDate']));
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#showPlantPage'>" +
                "<img src='" + image + "' width='128px' height='128px' alt='" + row['plantName'] + "'>" +
                "<h3>" + row['plantName'] + "</h3>" +
                "<p>" + plantDate + " ~ " + deathDate + "</p>" +
                "</a></li>";
        }

        var plantList = $("#plantListview");
        plantList = plantList.html(htmlCode);
        plantList.listview("refresh");

        //Add clickHandler except first line(Add new plant)
        //Update dropdown for add page only when coming from add plant button
        $("#plantListview a:eq(0)").on("click", addPlantUpdateTypeDropdown);
        $("#plantListview a:gt(0)").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("plantId", $(this).attr("data-row-id"));
        }
    }

    Plant.selectAll(options, callback);
}


function addPlantGetAllMothers() {
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var plantDate = getFormattedDate(new Date(row['plantDate']));
            var deathDate = row['deathDate'];

            if (row['isDead'] == "false") {
                deathDate = "Present";
            } else {
                deathDate = getFormattedDate(new Date(row['deathDate']));
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + image + "' width='100%' height='100%' alt='" + row['plantName'] + "'>" +
                "<h3>" + row['plantName'] + "</h3>" +
                "<p>" + plantDate + " ~ " + deathDate + "</p>" +
                "</a></li>";
        }

        var plantList = $("#addPlantSearchMotherListview");
        plantList = plantList.html(htmlCode);
        plantList.listview("refresh");

        $("#addPlantSearchMotherListview a").on("click", clickHandler);

        function clickHandler() {
            $.mobile.changePage("#addPlantPage", {transition: 'none'});
            var motherId = $(this).attr("data-row-id");
            $("#addPlantMotherId").val(motherId);
            addPlantGetMotherName(motherId);
        }
    }

    Plant.selectAll(options, callback);
}


function editPlantGetAllMothers() {
    var ownerId = localStorage.getItem("currentUser");
    var plantId = localStorage.getItem("plantId");
    var options = [plantId, plantId, ownerId];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var plantDate = getFormattedDate(new Date(row['plantDate']));
            var deathDate = row['deathDate'];

            if (row['isDead'] == "false") {
                deathDate = "Present";
            } else {
                deathDate = getFormattedDate(new Date(row['deathDate']));
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + image + "' width='100%' height='100%' alt='" + row['plantName'] + "'>" +
                "<h3>" + row['plantName'] + "</h3>" +
                "<p>" + plantDate + " ~ " + deathDate + "</p>" +
                "</a></li>";
        }

        var plantList = $("#editPlantSearchMotherListview");
        plantList = plantList.html(htmlCode);
        plantList.listview("refresh");

        $("#editPlantSearchMotherListview a").on("click", clickHandler);

        function clickHandler() {
            $.mobile.changePage("#editPlantPage", {transition: 'none'});
            var motherId = $(this).attr("data-row-id");
            $("#editPlantMotherId").val(motherId);
            editPlantGetMotherName(motherId);
        }
    }

    //This query plants except itself
    Plant.selectAllMother(options, callback);
}


function addSchedule() {
    if (doValidate_frmAddSchedule()) {
        var plantId = $("#addSchedulePlantId").val();
        var scheduleName = $("#addScheduleName").val();
        var startDateTime = $("#addStartDateTime").val();
        var endDateTime = $("#addEndDateTime").val();
        var scheduleDesc = $("#addScheduleDesc").val();

        var options = [plantId, scheduleName, startDateTime, endDateTime, scheduleDesc];

        function callback() {
            alert("New Schedule Added");
            console.info("Success: Record inserted successfully");
            $.mobile.changePage("#schedulePage", {transition: 'none'});
        }

        Schedule.insert(options, callback);
    }
    else {
        console.error("Validation failed");
    }
}

function updateSchedule() {
    if (doValidate_frmEditSchedule()) {
        var scheduleId = localStorage.getItem("scheduleId");
        var plantId = $("#editSchedulePlantId").val();
        var scheduleName = $("#editScheduleName").val();
        var startDateTime = $("#editStartDateTime").val();
        var endDateTime = $("#editEndDateTime").val();
        var scheduleDesc = $("#editScheduleDesc").val();

        var options = [plantId, scheduleName, startDateTime, endDateTime, scheduleDesc, scheduleId];

        function callback() {
            alert("Schedule Updated");
            console.info("Success: Record inserted successfully");
            $.mobile.changePage("#schedulePage", {transition: 'none'});
        }

        Schedule.update(options, callback);
    }
    else {
        console.error("Validation failed");
    }
}


function deleteSchedule() {

    var id = localStorage.getItem("scheduleId");
    var options = [id];

    function callback() {
        console.info("Success: schedule record deleted successfully.");
        $.mobile.changePage("#schedulePage", {transition: 'none'});
    }

    Schedule.delete(options, callback);
}

function showScheduleGetPlantName(plantId) {
    var options = [plantId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#showSchedulePlantName").text(row['plantName']);
    }

    Plant.select(options, callback);
}

function addScheduleGetPlantName(plantId) {
    var options = [plantId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#addSchedulePlantName").val(row['plantName']);
    }

    Plant.select(options, callback);
}

function editScheduleGetPlantName(plantId) {
    var options = [plantId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#editSchedulePlantName").val(row['plantName']);
    }

    Plant.select(options, callback);
}


function addScheduleGetAllPlants() {
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var plantDate = getFormattedDate(new Date(row['plantDate']));
            var deathDate = row['deathDate'];

            if (row['isDead'] == "false") {
                deathDate = "Present";
            } else {
                deathDate = getFormattedDate(new Date(row['deathDate']));
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + image + "' width='100%' height='100%' alt='" + row['plantName'] + "'>" +
                "<h3>" + row['plantName'] + "</h3>" +
                "<p>" + plantDate + " ~ " + deathDate + "</p>" +
                "</a></li>";
        }

        var plantList = $("#addScheduleSearchPlantListview");
        plantList = plantList.html(htmlCode);
        plantList.listview("refresh");

        $("#addScheduleSearchPlantListview a").on("click", clickHandler);

        function clickHandler() {
            $.mobile.changePage("#addSchedulePage", {transition: 'none'});
            var plantId = $(this).attr("data-row-id");
            $("#addSchedulePlantId").val(plantId);
            addScheduleGetPlantName(plantId);
        }
    }

    Plant.selectAll(options, callback);
}


function editScheduleGetAllPlants() {
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var plantDate = getFormattedDate(new Date(row['plantDate']));
            var deathDate = row['deathDate'];

            if (row['isDead'] == "false") {
                deathDate = "Present";
            } else {
                deathDate = getFormattedDate(new Date(row['deathDate']));
            }

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + image + "' width='100%' height='100%' alt='" + row['plantName'] + "'>" +
                "<h3>" + row['plantName'] + "</h3>" +
                "<p>" + plantDate + " ~ " + deathDate + "</p>" +
                "</a></li>";
        }

        var plantList = $("#editScheduleSearchPlantListview");
        plantList = plantList.html(htmlCode);
        plantList.listview("refresh");

        $("#editScheduleSearchPlantListview a").on("click", clickHandler);

        function clickHandler() {
            $.mobile.changePage("#editSchedulePage", {transition: 'none'});
            var plantId = $(this).attr("data-row-id");
            $("#editSchedulePlantId").val(plantId);
            editScheduleGetPlantName(plantId);
        }
    }

    Plant.selectAll(options, callback);
}

function getAllSchedules() {
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];

    function callback(tx, results) {
        var htmlCode = "";
        htmlCode += "<li><a href='#addSchedulePage' class='ui-btn ui-btn-icon-left ui-icon-plus'><h3>Add a new schedule</h3></a></li>";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];

            var startDate = new Date(row['startDateTime']);

            if (checkIsToday(startDate)) {
                startDate = "Today"
            } else {
                startDate = getFormattedDateTime(startDate);
            }

            var startTime = getFormattedTime(row['startDateTime']);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['scheduleId'] + " href='#'>" +
                "<img src='" + image + "' width='100%' height='100%' alt='" + row['scheduleName'] + "'>" +
                "<h3>" + row['scheduleName'] + "</h3>" +
                "<p>" + row['plantName'] + ", " + startDate + ", " + startTime + "</p>" +
                "</a></li>";
        }

        var scheduleList = $("#scheduleListview");
        scheduleList = scheduleList.html(htmlCode);
        scheduleList.listview("refresh");

        //Add clickHandler except first line(Add new plant)
        $("#scheduleListview a:gt(0)").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("scheduleId", $(this).attr("data-row-id"));
            $.mobile.changePage("#showSchedulePage", {transition: 'none'});
        }
    }

    Schedule.selectAll(options, callback);
}

function getScheduleToShow() {
    var scheduleId = localStorage.getItem("scheduleId");
    var options = [scheduleId];
    console.info("scheduleId: " + scheduleId);

    function callback(tx, results) {
        var row = results.rows[0];
        var image = row['photo'];

        var startDate = new Date(row['startDateTime']);

        if (checkIsToday(startDate)) {
            startDate = "Today"
        } else {
            startDate = getFormattedDateTime(startDate);
        }
        var startTime = getFormattedTime(row['startDateTime']);

        $("#showScheduleName").text(row['scheduleName']);
        $("#showSchedulePlantName").text(row['plantId']);
        $("#showStartDateTime").text(startDate + ", " + startTime);

        $("#showSchedulePlantProfileImg").html("<img src='" + image + "' height='128' width='128'/>");
        $("#showScheduleDesc").text(row['scheduleDesc']);

        if (row['plantId'] == null) {
            $("#showPlantName").text("-");
        } else {
            showScheduleGetPlantName(row['plantId']);
        }
    }

    Schedule.select(options, callback);
}

function getScheduleToEdit() {
    $.mobile.changePage("#editSchedulePage", {transition: 'none'});
    var scheduleId = localStorage.getItem("scheduleId");
    var options = [scheduleId];

    function callback(tx, results) {
        var row = results.rows[0];

        $("#editScheduleName").val(row['scheduleName']);
        $("#editSchedulePlantId").val(row['plantId']);
        $("#editStartDateTime").val(row['startDateTime']);
        $("#editEndDateTime").val(row['endDateTime']);
        $("#editScheduleDesc").text(row['scheduleDesc']);

        if (row['plantId'] != null) {
            editScheduleGetPlantName(row['plantId']);
        }
    }

    Schedule.select(options, callback);
}

function addUser() {
    if (doValidate_frmAddUser()) {
        var userName = $("#addUserName").val().toLowerCase();
        var password = $("#addPassword").val();
        var firstName = $("#addFirstName").val();
        var lastName = $("#addLastName").val();
        var email = $("#addEmail").val();
        var address = $("#addAddress").val();
        var phoneNumber = $("#addPhoneNumber").val();


        var options = [userName, password, firstName, lastName, email, address, phoneNumber];

        function callback() {
            console.info("Success: user record added successfully.");
            $.mobile.changePage("#homePage", {transition: 'none'});
            resetRegisterPageInputs();
        }

        User.insert(options, callback);
    }
    else {
        console.error("New user validation failed.");
    }
}


function deleteUser() {
    var id = localStorage.getItem("currentUser");
    var options = [id];

    function callback() {
        resetLoginPageInputs();
        console.info("Success: user record deleted successfully.");
    }

    User.delete(options, callback);
    $.mobile.changePage("#loginPage", {transition: 'none'});
}

function checkForExistingUser() {
    if (doValidate_frmAddUser()) {
        var userName = $("#addUserName").val().toLowerCase();
        var options = [];
        var userExists = false;
        var numOfUsers = 0;
        var currentUser = "";

        function callback(tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows[i];

                numOfUsers++;

                if (row['userName'] == userName) {
                    userExists = true;
                }
            }

            if (userExists) {
                alert("Username already exists. Please try again");
            }
            else {
                addUser();
                currentUser = numOfUsers + 1;
                localStorage.setItem("currentUser", currentUser);
            }
        }
    }
    else {
        console.error("New user validation failed.");
    }
    User.selectAll(options, callback);
}


function validateLogin() {
    if (doValidate_frmLogin()) {
        // var form = $("#frmLogin");
        var userId = $("#userId").val().toLowerCase();
        var password = $("#password").val();
        var options = [];
        var validUser = false;
        var currentUser = "";

        function callback(tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows[i];

                if (userId == row['userName'] && password == row['password']) {
                    validUser = true;
                    currentUser = row['id'];
                }
            }

            if (validUser) {
                localStorage.setItem("currentUser", currentUser);
                $.mobile.changePage("#homePage", {transition: 'none'})
            }
            else {
                alert("Sorry, your login entry doesn't match our records. Please try again.")
            }
        }

    }
    else {
        console.error("Log in validation error.");
    }

    User.selectAll(options, callback);
}

function getNotifications() {
    var ownerId = localStorage.getItem("currentUser");
    var options = [ownerId];
    var htmlCode = "";

    function callback(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var image = row['photo'];
            var startDate = new Date(row['startDateTime']);
            var startTime = getFormattedTime(row['startDateTime']);

            if (checkIsToday(startDate)) {
                startDate = "Today";
                htmlCode += "<li><a data-role='button' data-row-id=" + row['scheduleId'] + " href='#'>" +
                    "<img src='" + image + "' width='100%' height='100%' alt='" + row['scheduleName'] + "'>" +
                    "<h3>" + row['scheduleName'] + "</h3>" +
                    "<p>" + row['plantName'] + ", " + startDate + ", " + startTime + "</p>" +
                    "</a></li>";
            }
        }

        var lv = $("#lvNotifications");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lvNotifications a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("scheduleId", $(this).attr("data-row-id"));
            $.mobile.changePage("#showSchedulePage", {transition: 'none'});
        }
    }

    Schedule.selectAll(options, callback);
    $("#briefingDate").text(getFormattedDate(new Date()));
}


function getSuggestion() {
    var options = [];
    var htmlCode = "";

    function callback(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            var startDate = new Date(row['startDate']);
            var endDate = new Date(row['endDate']);
            var today = new Date();
            var image = row['photo'];

            if (startDate <= today && endDate >= today) {
                htmlCode += "<img src='" + image + "' width='100%' height='100%' alt='" + row['suggestionName'] + "'>" +
                    "<p>" + row['suggestionName'] + "</p>" +
                    "<p style='font-weight: lighter'>" + row['suggestionDesc'] + "</p>";
            }
        }

        $("#suggestion").html(htmlCode);
    }

    Suggestion.selectAll(options, callback);
}

function logoutUser() {
    resetLoginPageInputs();
    $.mobile.changePage("#loginPage", {transition: 'none'});
}

function showAccountSettings() {
    var currentUser = localStorage.getItem("currentUser");
    var options = [currentUser];

    function callback(tx, results) {
        var row = results.rows[0];

        $("#updateUserName").text(row['userName']);
        $("#updatePassword").val(row['password']);
        $("#updateFirstName").val(row['firstName']);
        $("#updateLastName").val(row['lastName']);
        $("#updateEmail").val(row['email']);
        $("#updateAddress").val(row['address']);
        $("#updatePhoneNumber").val(row['phoneNumber']);
    }

    User.select(options, callback);
}

function updateUserAcountSettings() {
    if (doValidate_frmUpdateUser()) {
        var id = localStorage.getItem("currentUser");

        var userName = $("#updateUserName").val().toLowerCase();
        var password = $("#updatePassword").val();
        var firstName = $("#updateFirstName").val();
        var lastName = $("#updateLastName").val();
        var email = $("#updateEmail").val();
        var address = $("#updateAddress").val();
        var phoneNumber = $("#updatePhoneNumber").val();

        var options = [userName, password, firstName, lastName, email, address, phoneNumber, id];

        function callback() {
            console.info("Success: user record added successfully.");
            alert("Account settings updated successfully.");
            $.mobile.changePage("#settingsPage", {transition: 'none'});
        }

        User.update(options, callback);
    }
    else {
        console.error("New user validation failed.");
    }
}

function getUserName() {
    var userId = localStorage.getItem("currentUser");
    var options = [userId];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#summaryPageUserName").text(row['userName']);
    }

    User.select(options, callback);

}

function adminLogin() {
    if (localStorage.getItem("isDataInserted") != "true") {
        function callback() {
            console.info("Success: Record inserted successfully");
        }

        //Sample user data
        // var options = [userName, password, firstName, lastName, email, address, phoneNumber];
        options = ["eddard", "eddard", "Eddard", "Stark", "eStark@gmail.com", "123 Winterfell Street", "123-456-1234"];
        User.insert(options, callback);
        options = ["user2", "user2", "Tywin", "Lanister", "tLanister@gmail.com", "123 Casterly Rock Drive", "123-456-1234"];
        User.insert(options, callback);
        options = ["cat", "thisiscat", "Catherine", "Thom", "cath@gmail.com", null, "2342342345"];
        User.insert(options, callback);

        //Sample plant data
        // var sql = "INSERT INTO plant(ownerId, plantName, photo, typeId, plantDate, isDead, deathDate, motherId, plantDesc) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
        var options = [1, "Sansa&Arya", "img/plant01.png", 1, "2018-04-15", "false", null, null, "Lovely sisters who lost their parents. Lady Sansa Stark is the eldest daughter of Lord Eddard Stark of Winterfell and his wife Lady Catelyn, sister of Robb, Arya, Bran and Rickon Stark, and half-sister of Jon Snow."];
        Plant.insert(options, callback);
        options = [1, "Robb", "img/plant02.png", 2, "2018-04-16", "true", "2015-01-14", 1, "King Robb Stark was the eldest son of Lord Eddard Stark of Winterfell and his wife, Lady Catelyn. He was the older brother of Sansa, Arya, Bran, and Rickon Stark, and cousin (believed to be half-brother) of Jon Snow."];
        Plant.insert(options, callback);
        options = [1, "Jon", "img/plant03.png", 3, "2014-12-07", "false", null, 1, "Jon Snow, born Aegon Targaryen, is the son of Lyanna Stark and Rhaegar Targaryen, the late Prince of Dragonstone. From infancy, Jon is presented as the bastard son of Lord Eddard Stark, Lyanna's brother, and raised by Eddard alongside his lawful children at Winterfell."];
        Plant.insert(options, callback);
        options = [2, "Cersei", "img/plant04.png", 1, "2018-04-15", "false", null, "", "Queen Cersei I Lannister is the widow of King Robert Baratheon and Queen of the Seven Kingdoms. She is the daughter of Lord Tywin Lannister, twin sister of Jaime Lannister and elder sister of Tyrion Lannister."];
        Plant.insert(options, callback);
        options = [2, "Jaime", "img/plant05.png", 2, "2018-04-16", "true", "2015-01-14", 1, "Ser Jaime Lannister is the eldest son of Tywin, younger twin brother of Cersei, and older brother of Tyrion Lannister. He is involved in an incestuous relationship with Cersei, and unknown to most, he is the biological father of her three children, Joffrey, Myrcella, and Tommen."];
        Plant.insert(options, callback);
        options = [2, "Tyrion", "img/plant06.png", 3, "2014-12-07", "false", null, 1, "Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister. A dwarf, he uses his wit and intellect to overcome the prejudice he faces."];
        Plant.insert(options, callback);

        //Sample schedule data
        // var options = [plantId, scheduleName, startDateTime, endDateTime, scheduleDesc];
        var today = new Date();
        var currentMonth = today.getMonth();
        var currentDate = today.getDate();

        if (today.getMonth() + 1 < 10) {
            currentMonth = "0" + (today.getMonth() + 1);
        }
        if (today.getDate() < 10) {
            currentDate = "0" + today.getDate();
        }

        var todayDate = today.getFullYear() + "-" + currentMonth + "-" + currentDate;
        options = [1, "Water", todayDate + "T13:00", todayDate + "T14:00", "Don't forget to water this morning!!"];
        Schedule.insert(options, callback);
        options = [2, "Sun Light", todayDate + "T15:00", todayDate + "15:30", "Give some light"];
        Schedule.insert(options, callback);
        options = [3, "Fertilizer", "2018-05-01T20:00", "2018-05-01T20:10", "Fertilize it!"];
        Schedule.insert(options, callback);
        options = [4, "Change pot", todayDate + "T08:00", todayDate + "T09:00", "She needs a bigger pot"];
        Schedule.insert(options, callback);
        options = [5, "Sun Light", todayDate + "T12:00", todayDate + "13:00", "Give some light"];
        Schedule.insert(options, callback);
        options = [6, "Fertilizer", "2018-04-30T10:00", "2018-04-30T10:30", "Give some fertilizer. He's too short!"];
        Schedule.insert(options, callback);

        localStorage.setItem("isDataInserted", "true");
    }

    localStorage.setItem("currentUser", "1");
    $.mobile.changePage("#homePage", {transition: 'none'});
}