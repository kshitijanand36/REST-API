
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

app.get("/articles" , function(req , res){

  Article.find({} , function(err , results){

    if(err){

      res.send(err);


    }

    else{

      res.send(results);

    }
  })

});

app.post("/articles" , function(req , res){

  console.log(req.body.title);
  console.log(req.body.content);

  const newArticle = new Article({
    title : req.body.title,
    content : req.body.content
  });

  newArticle.save(function(err){

    if(err){
      res.send(err);
    }

    else{

      res.send("Succesfully added!");
    }
  });
});

app.delete("/articles" , function(req , res){

  Article.deleteMany(function(err){

    if(err){

      res.send("Oh no!");
    }

    else{

      res.send("Successfully deleted all the items!");
    }
  })
})


app.listen(3000 , function(){

  console.log("Server started on port 3000");
})
