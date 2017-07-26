var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

/* Blog post schema
-title
-image
-body
-created
*/


//APP CONFIG
mongoose.connect("mongodb://localhost/blog_app", {
    useMongoClient: true,
});
app.set("view engine", "ejs"); // set extensions for app to be EJS
app.use(express.static("public")); // to serve custom style sheet
app.use(bodyParser.urlencoded({extended:true}));


//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test Title",
// 	image: "https://farm8.staticflickr.com/7589/17019550025_c08deb03a4.jpg",
// 	body: "Hello World"
// });

//RESTful ROUTES

app.get('/', function (req, res) {
  res.redirect('/blogs');
})

app.get('/blogs', function (req, res) {
	Blog.find({}, function(err, blogs){
		if (err) {
			console.log(err);
		} else {
  			res.render("index", {blogs:blogs});
		}
	})
})

app.listen(3000, function () {
  console.log('Blog app listening on port 3000!')
})