const express = require('express');
const bodyparser = require('body-parser');
const {getReposByUsername} = require('../helpers/github')
const {save, Repo} = require('../database/index');
let app = express();
app.use(bodyparser.json())

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.user, (err, list)=>{
    if(err){
      res.send(err);
    }else{
      save(list);
    res.send("save sent");
    }
  });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
});

app.get('/repos', function (req, res) {
  Repo.find((err, repos)=>{
    if(err){
      res.send(err);
    }else{
      res.send(repos);
    }
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

