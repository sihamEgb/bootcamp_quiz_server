const express = require("express");
const router = express.Router();

let questions = require("../../quiz");


	// get all questions
	router.get("/questions",(req,res) => {
		res.json(questions);
	})


module.exports = router