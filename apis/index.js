'use strict';

const {Router} = require("express")
const router = Router()


const processFolder = require("./process")
router.use("/v1/process", processFolder)



router.use((req,res,next) => {
    if(!req.route){
        const err = new Error ('Route not found')
        err.statusCode = 404
        next(err)
    }else{
        next()
    }
})

module.exports = router;