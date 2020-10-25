console.log("hello world");

const endpoint = "http://localhost:3000/usersapi/users";

const question_endpoint = "http://localhost:3000/questionsapi/questions";



function renderQuestion(quiz){
	
	const quizContainer = document.querySelector('.quizContainer');
	
	const question = document.createElement('p');
	question.innerHTML = quiz[0].question;

	quizContainer.append(question);


}
// answer for user id = 1
function addAnswers(){

}
function getQuiz(){
	const reqData =  fetch(question_endpoint).then((response) => {
		response.json().then((data) => {
		console.log("question and answers",data);
		renderQuestion(data);
	});

});
}
function getUsers(){
	
	const reqAnswers =  fetch(endpoint).then((response) => {
			response.json().then((data) => {
			console.log(data);
		});

	});
	// return reqAnswers.json();
}

getUsers();
getQuiz();



