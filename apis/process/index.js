"use strict";

const {Router} = require("express")
const router = Router()

const controller = require("./controller");
const { body } = require('express-validator');


router.post("/write", [
	body('process_name', 'please enter process_name').not().isEmpty(),
	body('key','please enter key').not().isEmpty(),
	body('value', 'please enter value').not().isEmpty()
], controller.write)


router.get("/read/:process_name", controller.read)


module.exports = router