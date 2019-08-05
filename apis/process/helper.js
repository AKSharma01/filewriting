"use strict";

const fs = require("fs");

const readFromFile = (filename) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (error, data) => {
			if(error){
				reject(error)
			}else{
				let dataResponse = {
					enviroment: []
				}
				data = data.toString().split("\n")
				data.forEach((keyValue) => {
					if(keyValue){
						keyValue = keyValue.split("=")
						dataResponse.enviroment.push({
							key: keyValue[0],
							value: keyValue[1]
						})
					}
				})
				resolve(dataResponse)
			}
		})
		
	})
}


module.exports = {
	readFromFile
}