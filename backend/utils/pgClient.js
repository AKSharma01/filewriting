'use strict';

const {Client} = require("pg");

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

const client = new Client({
    user: process.env[environ + "PSQL_DB_USER"],
    database: process.env[environ + "PSQL_DB_NAME"],
    port: process.env[environ + "PSQL_DB_PORT"],
    host: process.env[environ + "PSQL_DB_HOST"],
    password: process.env[environ + "PSQL_DB_PASSWORD"],

})

client.connect()

module.exports = client