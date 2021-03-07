
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

app.route("/articles").get((req , res)=>{

  Article.find({} , function(err , results){

    if(err){
      res.send(err);
    }

    else{
      res.send(results);

    }
  })
})
.post((req , res)=>{

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
})

.delete((req , res)=>{

  Article.deleteMany(function(err){

    if(err){

      res.send("Oh no!");
    }

    else{

      res.send("Successfully deleted all the items!");
    }
  })

});

app.route("/articles/:param")

.get( function(req , res){

  const curr_title = req.params.param;

  Article.findOne({title : curr_title} , function(err , result){

    if(err || !result){

      res.send("Article not found!");
    }

    else{

      res.send(result);
    }
  })


})

.put((req , res)=>{

  const curr_title = req.params.param;
  Article.update({ title : curr_title},{title : req.body.title,content : req.body.content},{  overwrite : true},function(err){
      if(err){
        res.send(err);
      }

      else{

        res.send("Successfully updated!");
      }
    })

  })

.patch(function(req , res){

  const curr_title = req.params.param;
  Article.update({ title : curr_title},
    {  $set : req.body},
    function(err){
      if(err){
        res.send(err);
      }

      else{

        res.send("Successfully updated!");
      }
    })


})

.delete(function(req , res){
  const curr_title = req.params.param;

  Article.deleteOne({title : curr_title} , function(err){

    if(err){

      res.send("Not delelted!");
    }

    else{

      res.send("Deleted successfully!")
    }
  })

});

app.listen(3000 , function(){

  console.log("Server started on port 3000");
})
