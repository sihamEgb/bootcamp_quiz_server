const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let users = require("../../profiles/users");
let answers = require("../../profiles/answers")
const quiz = require("../../quiz");

// get all answers
router.get("/",(req,res) => {
	res.json(answers);
})

// get all answers for profile id (array of answers)
router.get("/:userId",(req,res) => {

	const found = answers.filter(item => item.userId === req.params.userId);
	console.log(found);
	res.json(found);
})

// get answers for id (specific user) + rank
router.get("/:userId/:friendId",(req,res) => {
	const found = answers.find(item => item.id === req.params.friendId && item.userId === req.params.userId);
	if(!found)
	{
		return res.sendStatus(400);
	}
	let rank  = 0;
	const user = users.find(user => user.id === req.params.userId);
	if(user.answer1 === found.answer1) rank++;
	if(user.answer2 === found.answer2) rank++;
	if(user.answer3 === found.answer3) rank++;
	if(user.answer4 === found.answer4) rank++;
	found.rank = rank;
	console.log(found);
	res.json(found);
})

// create new answer for userId (new person answers the quiz for friend)
router.post('/:userId/:friendId',(req,res) => {
	
	const newAnswer = {
		id:req.params.friendId,
		userId:req.params.userId,
		answer1:req.body.answer1,
		answer2:req.body.answer2,
		answer3:req.body.answer3,
		answer4:req.body.answer4,
	}
	console.log(newAnswer);

	if(!newAnswer.id || !newAnswer.answer1 || 
		!newAnswer.answer2 || !newAnswer.answer3 || 
		!newAnswer.answer3  || !newAnswer.userId){
		return res.sendStatus(400);
	}
	answers.push(newAnswer);
	res.json(answers);
});	
		
module.exports = router