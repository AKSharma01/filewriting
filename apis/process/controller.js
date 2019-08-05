"use strict";

const fs = require("fs");
const shellJS = require("shelljs");
const utils = require(rootDir+"/utils");
const processHelper = require("./helper");
const constants = require(rootDir + "/utils/constants")
const { validationResult } = require('express-validator');

const response = utils.response;

const writeIntoProcessfile = utils.writeIntoProcessfile;



const write = (req, res) => {


	const errors = validationResult(req);

	if (errors.errors.length) {
		let error = '';
		// console.log("errors: ", errors)
		errors.errors.forEach(element => {
			error += ' ...' + element.msg;
		});
		return response.failure(res, error, constants.ERROR_500.STATUS);
	}

	let baseFolder = rootDir+"/process/"

	let directories = shellJS.ls(baseFolder)
	req.body.directories = directories

	let errorMsg = requestCustomValidator(req.body)
	if(errorMsg)
		return response.failure(res, errorMsg, constants.ERROR_404.STATUS);
	


	
	let filename = baseFolder + req.body.process_name + "/.env"

	writeIntoProcessfile(filename, {
		...req.body
	}).then((done) => {
		return processHelper.readFromFile(filename)
	}).then((dataResponse) => {
		return response.success(res, dataResponse, constants.SUCCESS_201.MESSAGE, constants.SUCCESS_201.STATUS)
	}).catch((error) => {
		return response.failure(res, error.message, constants.ERROR_417.STATUS)
	})
}



const read = (req, res) => {
	let baseFolder = rootDir+"/process/"

	let directories = shellJS.ls(baseFolder)

	if(! directories.includes(req.params.process_name)){
		return response.failure(res, "process not found", constants.ERROR_404.STATUS);
	}

	let filename = baseFolder + req.params.process_name + "/.env"

	processHelper.readFromFile(filename).then((dataResponse) => {
		return response.success(res, dataResponse, `enviroment variables from ${req.params.process_name}`, constants.SUCCESS_200.STATUS)
	}).catch((error)=>{
		return response.failure(res, error.message, constants.ERROR_417.STATUS)
	})
	
}


const requestCustomValidator = (body) => {
	if(! body.directories.includes(body.process_name)){
		return "process not found"
	}
	if(body.key.trim().split(" ").length > 1)
		return "invalid key name"
	
	let format =  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	if(format.test(body.key))
		return "no special characters is allowed"
	return ""

}




module.exports = {
	read,
	write,
}