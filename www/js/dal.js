/* dal.js
* Final Project
*
*   Revision History
*       Jaden Ahn, 2018.04.09 : Created
*/

var Plant = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO plant(ownerId, plantName, photo, typeId, plantDate, isDead, deathDate, motherId, plantDesc) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE plant SET ownerId = ?, plantName = ?, photo = ?, typeId = ?, plantDate = ?, isDead = ?, deathDate = ?, motherId = ?, plantDesc  = ? WHERE id = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM plant WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM plant WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM plant WHERE ownerId = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllMother: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM plant WHERE id <> ? AND motherId <> ? AND ownerId = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


var Schedule = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO schedule(plantId, scheduleName, startDateTime, endDateTime, scheduleDesc) VALUES(?, ?, ?, ?, ?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE schedule SET plantId = ?, scheduleName = ?, startDateTime = ?, endDateTime = ?, scheduleDesc = ? WHERE scheduleId = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM schedule WHERE scheduleId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM schedule JOIN plant ON schedule.plantId = plant.id WHERE scheduleId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM schedule JOIN plant ON schedule.plantId = plant.id WHERE plant.ownerId = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


var Type = {
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type WHERE id = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var User = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO user(userName, password, firstName, lastName, email, address, phoneNumber) VALUES(?, ?, ?, ?, ?, ?, ?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            // var sql = "SELECT * FROM user WHERE username = ?;";
            var sql = "SELECT * FROM user WHERE id = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM user WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE user SET userName = ?, password = ?, firstName = ?, lastName = ?, email = ?, address = ?, phoneNumber = ? WHERE id = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};

var Suggestion = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO suggestion(suggestionName, suggestionDesc, startDate, endDate, photo) VALUES(?, ?, ?, ?, ?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM suggestion;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
