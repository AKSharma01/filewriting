'use strict';

const Sequelize = require('sequelize');
const constants = require("./constants");

const db = {};

let env = process.env.ENV;
let environ;
switch (env) {
    case 'local':
        environ = "LOCAL_";
        break;
    case "dev":
        environ = "DEV_";
        break;
    case "prod":
        environ = "PROD_";
        break;
}

// terminate the server if env is not set properly
if (!environ) {
    console.log("env not set");
    process.exit();
}

let setting = {
    host: process.env[environ + "PSQL_DB_HOST"],
    database: process.env[environ + "PSQL_DB_NAME"],
    username: process.env[environ + "PSQL_DB_USER"],
    password: process.env[environ + "PSQL_DB_PASSWORD"],
    dialect: process.env[environ + "PSQL_DB_TYPE"],
    port: process.env[environ + "PSQL_DB_PORT"],
    pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 50000,
        evict: 50000,
        handleDisconnects: true
    },
    operatorsAliases: false,
    logging: false
}

console.log("setting host: ", setting.host, setting.dialect);

const sequelize = new Sequelize(setting);

sequelize
    .authenticate()
    .then(() => {
        console.log('connected to database successfully')
    })
    .catch((error) => {
        console.log(`error message: (postgres db connection error) ${error.message}`);
        process.exit();
    });


sequelize.sync({
    force: false
});



db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
