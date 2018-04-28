/* util.js
* Final Project
*
*   Revision History
*       Jaden Ahn, 2018.04.09 : Created
*       Jaden Ahn, 2018.04.20 : Added validation
*/

var monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

function resetLoginPageInputs() {
    $("#password").val("");
    $("#userId").val("");
    localStorage.setItem("currentUser", "");
}

function resetRegisterPageInputs() {
    //erase new user inputs values
    $("#addUserName").val("");
    $("#addPassword").val("");
    $("#addFirstName").val("");
    $("#addLastName").val("");
    $("#addEmail").val("");
    $("#addAddress").val("");
    $("#addPhoneNumber").val("");
}

function getFormattedDate(date) {
    var day = date.getDate() + 1;
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    return month + " " + day + ", " + year;
}

function getFormattedDateTime(date) {
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    return month + " " + day + ", " + year;
}

function checkIsToday(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var today = new Date();
    if (today.getFullYear() == year && today.getMonth() == month && today.getDate() == day) {
        return true;
    }
    return false;
}

function getFormattedTime(date) {
    var startTime = date.substr(11, 5);
    var startTimeInt = parseInt(startTime.substr(0, 2));
    var timeUnit = "AM";

    if (startTimeInt > 12) {
        timeUnit = "PM";
        startTimeInt = startTimeInt - 12;
        if (startTimeInt < 10) {
            startTimeInt = "0" + startTimeInt;
        }
        startTime = startTimeInt + date.substr(13, 3);
    }

    return startTime + " " + timeUnit;
}

function doValidate_frmAddPlant() {
    var form = $("#frmAddPlant");
    form.validate({
        rules: {
            addPlantName: {
                required: true,
                rangelength: [2, 20]
            },
            addPlantDate: {
                required: true
            }
        },
        messages: {
            addPlantName: {
                required: "You must enter a plant name.",
                rangelength: "Length must be 2-20 characters long."
            },
            addPlantDate: {
                required: "You must enter plant date."
            }
        }
    });
    return form.valid();
}


function doValidate_frmEditPlant() {
    var form = $("#frmEditPlant");
    form.validate({
        rules: {
            editPlantName: {
                required: true,
                rangelength: [2, 20]
            },
            editPlantDate: {
                required: true
            }
        },
        messages: {
            editPlantName: {
                required: "You must enter a plant name.",
                rangelength: "Length must be 2-20 characters long."
            },
            editPlantDate: {
                required: "You must enter plant date."
            }
        }
    });
    return form.valid();
}


function doValidate_frmAddSchedule() {
    var form = $("#frmAddSchedule");
    form.validate({
        rules: {
            addScheduleName: {
                required: true
            },
            addSchedulePlantName: {
                required: true
            },
            addStartDateTime: {
                required: true
            },
            addEndDateTime: {
                required: true
            }
        },
        messages: {
            addScheduleName: {
                required: "You must enter a schedule name."
            },
            addSchedulePlantName: {
                required: "You select a plant to add a schedule."
            },
            addStartDateTime: {
                required: "You must enter start date and time."
            },
            addEndDateTime: {
                required: "You must enter end date and time."
            }
        }
    });
    return form.valid();
}


function doValidate_frmEditSchedule() {
    var form = $("#frmEditSchedule");
    form.validate({
        rules: {
            editScheduleName: {
                required: true
            },
            editSchedulePlantName: {
                required: true
            },
            editStartDateTime: {
                required: true
            },
            editEndDateTime: {
                required: true
            }
        },
        messages: {
            editScheduleName: {
                required: "You must enter a schedule name."
            },
            editSchedulePlantName: {
                required: "You select a plant to add a schedule."
            },
            editStartDateTime: {
                required: "You must enter start date and time."
            },
            editEndDateTime: {
                required: "You must enter end date and time."
            }
        }
    });
    return form.valid();
}


function doValidate_frmAddUser() {
    var form = $("#frmAddUser");
    form.validate({
        rules: {
            addUserName: {
                required: true,
                rangelength: [2, 20]
            },
            addPassword: {
                required: true,
                rangelength: [4, 20]
            },
            addFirstName: {
                required: true,
                rangelength: [2, 20]
            },
            addLastName: {
                rangelength: [2, 20]
            },
            addEmail: {
                required: true,
                emailCheck: true
            },
            addAddress: {
                rangelength: [2, 30]
            },
            addPhoneNumber: {
                phoneNumCheck: true
            }
        },
        messages: {
            addUserName: {
                required: "You must enter a username.",
                rangelength: "Length must be 2-20 characters long."
            },
            addPassword: {
                required: "You must enter a password.",
                rangelength: "Length must be 4-20 characters long."
            },
            addFirstName: {
                required: "You must enter your first name.",
                rangelength: "Length must be 2-20 characters long."
            },
            addLastName: {
                rangelength: "Length must be 2-20 characters long."
            },
            addEmail: {
                required: "You must enter your email.",
                emailCheck: "Please enter a valid email address: ex. plant@gmail.com"
            },
            addAddress: {
                rangelength: "Length must be 2-30 characters long."
            },
            addPhoneNumber: {
                phoneNumCheck: "Please enter a valid phone number: ex. (519) 123-1234"
            }
        }
    });
    return form.valid();
}

function doValidate_frmLogin() {
    console.info("in validate");
    var form = $("#frmLogin");
    form.validate({
        rules: {
            userId: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            userId: {
                required: "You must enter a userId."
            },
            password: {
                required: "You must enter a password."
            }
        }
    });
    return form.valid();
}

function doValidate_frmUpdateUser() {
    var form = $("#frmUpdateUser");
    form.validate({
        rules: {
            updateUserName: {
                required: true,
                rangelength: [2, 20]
            },
            updatePassword: {
                required: true,
                rangelength: [4, 20]
            },
            updateFirstName: {
                required: true,
                rangelength: [2, 20]
            },
            updateLastName: {
                rangelength: [2, 20]
            },
            updateEmail: {
                required: true,
                emailCheck: true
            },
            updateAddress: {
                rangelength: [2, 30]
            },
            updatePhoneNumber: {
                phoneNumCheck: true
            }
        },
        messages: {
            updateUserName: {
                required: "You must enter a username.",
                rangelength: "Length must be 2-20 characters long."
            },
            updatePassword: {
                required: "You must enter a password.",
                rangelength: "Length must be 4-20 characters long."
            },
            updateFirstName: {
                required: "You must enter your first name.",
                rangelength: "Length must be 2-20 characters long."
            },
            updateLastName: {
                rangelength: "Length must be 2-20 characters long."
            },
            updateEmail: {
                required: "You must enter your email.",
                emailCheck: "Please enter a valid email address: ex. plant@gmail.com"
            },
            updateAddress: {
                rangelength: "Length must be 2-30 characters long."
            },
            updatePhoneNumber: {
                phoneNumCheck: "Please enter a valid phone number: ex. (519) 123-1234"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailCheck",
    function (value, element) {
        var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return this.optional(element) || regex.test(value);
    },
    "Must be valid email address, ex. 'a@gmail.com'");

jQuery.validator.addMethod("phoneNumCheck",
    function (value, element) {
        var regex = /^(\(\d{3}\)\s|^\d{3}[.-]?)?\d{3}[.-]?\d{4}$/;
        return this.optional(element) || regex.test(value);
    },
    "Must be valid phone number, ex. (519) 123-1234");