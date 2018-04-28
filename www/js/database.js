/* database.js
* Final Project
*
*   Revision History
*       Jaden Ahn, 2018.04.09 : Created
*/

var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.message + ") : ");
}

var DB = {
    createDatabase: function () {
        var name = "PetYourPlantDB";
        var version = "1.0";
        var displayName = "DB for PetYourPlant App";
        var size = 2 * 1024 * 1024;

        function successCreate() {
            console.info("Success: Database created successfully")
        }
        db = openDatabase(name, version, displayName, size, successCreate);
    },
    createTables: function () {
        function txFunction(tx) {
            function successCreate() {
                console.info("Success: Table created successfully");
            }
            var options = [];

            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successCreate, errorHandler);

            //Create type table
            sql = "CREATE TABLE IF NOT EXISTS type( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "typeName VARCHAR(30) NOT NULL);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            options = ['Common House Plants'];
            sql = "INSERT INTO type(typeName) VALUES(?);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            options = ['Flowering Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Foliage Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Cactus Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Hanging Basket Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Bulbous Type Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Fern Type Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);
            options = ['Large Plants'];
            tx.executeSql(sql, options, successCreate, errorHandler);

            //Create user table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS user( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "userName VARCHAR(20) NOT NULL," +
                "password VARCHAR(20) NOT NULL," +
                "firstName VARCHAR(20) NOT NULL," +
                "lastName VARCHAR(20)," +
                "email VARCHAR(20) NOT NULL," +
                "address VARCHAR(50)," +
                "phoneNumber VARCHAR(16));";

            tx.executeSql(sql, options, successCreate, errorHandler);

            //Create plant table
            //Add photo later
            sql = "CREATE TABLE IF NOT EXISTS plant( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "ownerId INTEGER NOT NULL," +
                "plantName VARCHAR(20) NOT NULL," +
                "photo BLOB," +
                "typeId INTEGER," +
                "plantDate DATE," +
                "isDead VARCHAR(1)," +
                "deathDate DATE," +
                "motherId INTEGER NULL," +
                "plantDesc VARCHAR(150)," +
                "FOREIGN KEY(ownerId) REFERENCES user(id)," +
                "FOREIGN KEY(typeId) REFERENCES type(id)," +
                "FOREIGN KEY(motherId) REFERENCES plant(id));";
            options = [];
            tx.executeSql(sql, options, successCreate, errorHandler);

            //Create schedule table
            sql = "CREATE TABLE IF NOT EXISTS schedule( " +
                "scheduleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "plantId INTEGER NOT NULL," +
                "scheduleName VARCHAR(20) NOT NULL," +
                "startDateTime DATETIME," +
                "endDateTime DATETIME," +
                "scheduleDesc VARCHAR(150)," +
                "FOREIGN KEY(plantId) REFERENCES plant(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            options = [];
            sql = "DROP TABLE IF EXISTS suggestion;";
            tx.executeSql(sql, options, successCreate, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS suggestion(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "suggestionName VARCHAR(250) NOT NULL," +
                "suggestionDesc VARCHAR(500) NOT NULL," +
                "startDate DATE," +
                "endDate DATE," +
                "photo BLOB);";

            tx.executeSql(sql, options, successCreate, errorHandler);

            //Set initial value
            sql = "INSERT INTO suggestion(suggestionName, suggestionDesc, startDate, endDate, photo) VALUES(?, ?, ?, ?, ?);";
            options = ["Time to start your garden", "Start your garden early while it's shiny out there! The weather will be perfect during this week.", "2018-04-17", "2018-06-01", "img/suggestion01.png"];
            tx.executeSql(sql, options, successCreate, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var options = [];
            function successDrop() {
                console.info("Dropped database successfully")
            }

            // Drop type table
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            // Drop user table
            sql = "DROP TABLE IF EXISTS user;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            // Drop plant table
            sql = "DROP TABLE IF EXISTS plant;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            // Drop schedule table
            sql = "DROP TABLE IF EXISTS schedule;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            alert("Database cleared");
        }
        function successTransaction() {
            console.info("Success: Drop table transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};