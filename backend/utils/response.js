'use strict';

const constants = require(rootDir+"/utils/constants");

const failure = (response, message=constants.ERROR_500.MESSAGE, statusCode=constants.ERROR_500.STATUS) => {

	response.json({
		message: message,
		status: statusCode
	}).status(statusCode)
};


const success = (response, data=null, message=constants.SUCCESS_200.MESSAGE, statusCode=constants.SUCCESS_200.STATUS) => {

	response.json({
		data: data,
		message: message,
		status: statusCode
	}).status(statusCode)
};


module.exports = {
    success,
    failure
}