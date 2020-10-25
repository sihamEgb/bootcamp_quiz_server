const express = require('express');
const path = require('path')
const app = express();

const port = process.env.PORT || 5000;
// const router = express.Router();
app.get("/",(req,res) => {
	res.send("Hello World");
})
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// serve all the files from public folder
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));


// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "public", "index.html"));
//  });
	// // open homepage
	// router.get("",(req,res) => {
	// 	res.render('index');
	// })

	app.use('/questionsapi', require('./routes/api/quiz'));
	app.use('/usersapi', require('./routes/api/users'));
	app.use('/answersapi', require('./routes/api/answers'));


// create a server
	const server = app.listen(port, () => {
	const host = server.address().address;
	const port = server.address().port;
  console.log('Server is up on http://'+host+':'+port);
})