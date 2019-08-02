'use strict';

const fs = require("fs");


/**
 * writeIntoProcessfile can be use as utils file, we can dynamically save our object in env
 * based on the object passed to the functions.
 */
const writeIntoProcessfile = (filename, option) => {

    return new Promise((resolve, reject) => {
        fs.stat(filename, (error, success) => {
            let line = "\n";
            
            line += `${option.key}=${option.value}` 
            
            if(error){
                
                fs.writeFile(filename, line, (error, success) => {
                    if(error)
                        reject(error);
                    else
                        resolve();
                });
            }else{
                fs.appendFile(filename, line, (error, success) => {
                    if(error)
                        reject(error)
                    else
                        resolve();
                });
            }

        })
    })
};

module.exports = writeIntoProcessfile;