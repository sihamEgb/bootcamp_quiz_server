const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let questions = require("../../quiz");
let users = require("../../profiles/Users");
const quiz = require("../../quiz");


	// get all users
	router.get("/users",(req,res) => {
		res.json(users);
	})
	
	// get user questions and answers
	router.get('/:id',(req,res) => {		
		const user = users.find(user => user.id === req.params.id);
		if(!user)
		{
			return res.sendStatus(400);
		}
		const response = {
			name:user.name,
			question1:quiz[0].question,
			answer1:user.answer1,
			question2:quiz[1].question,
			answer2:user.answer2,
			question3:quiz[2].question,
			answer3:user.answer3,
			question4:quiz[3].question,
			answer4:user.answer4,
		}
		res.json(response);
	});

	// create new user
	router.put('/:username',(req,res) => {
		const newUser = {
			id:uuid.v1(),
			name:req.params.username,
	
		}
		if(!newUser.name){
			return res.sendStatus(400);
		}
		users.push(newUser);
		res.json(users);
	});	

	// save quiz answers for myself
	router.post('/:id',(req,res) => {
		const found = users.find(user => user.id === req.params.id);
		console.log("found",found);
		console.log("found",req.body.answer1);

		if(found)
		{
			found.answer1 = req.body.answer1;
			found.answer2 = req.body.answer2;
			found.answer3 = req.body.answer3;
			found.answer4 = req.body.answer4;
			res.json(users);
		}
		else{
			return res.sendStatus(400);
		}
	});


module.exports = router