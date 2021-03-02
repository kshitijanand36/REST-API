
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(express.static("public"));

app.set('view engine' , 'ejs');

mongoose.connect("mongodb://localhost:27017/wikiDB" , {
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const articleSchema = {
  title : String,
  content : String
}

const Article = mongoose.model("Article" , articleSchema);

app.get("/" , function(req , res){

  Article.find({} , function(err , results){


  })

});


app.listen(3000 , function(){

  console.log("Server started on port 3000");
})
