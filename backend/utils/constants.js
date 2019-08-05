"use strict";


const error = {
    ERROR_400: {
        STATUS: 400,
        MESSAGE: "bad request"
    },
    ERROR_401: {
        STATUS: 401,
        MESSAGE: "unauthorized"
    },
    ERROR_403: {
        STATUS: 403,
        MESSAGE: "forbidden"
    },
    ERROR_404: {
        STATUS: 404,
        MESSAGE: "not found"
    },
    ERROR_409: {
        STATUS: 409,
        MESSAGE: "conflict"
    },
    ERROR_417: {
        STATUS: 417,
        MESSAGE: "expectation failed"
    },
    ERROR_423: {
        STATUS: 423,
        MESSAGE: "locked"
    },
    ERROR_424: {
        STATUS: 424,
        MESSAGE: "failed dependency"
    },

    ERROR_500: {
        STATUS: 500,
        MESSAGE: "internal server error"
    },
}


const success = {
    SUCCESS_200: {
        STATUS: 200,
        MESSAGE: "success"
    },
    SUCCESS_201: {
        STATUS: 201,
        MESSAGE: "new entity created"
    },
}


module.exports = {
    ...error,
    ...success
}