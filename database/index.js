const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  repoName: String,
  stars: Number,
  watchers: Number,
  url: String,
  reposUrl: {type:String, index: {unique : true}},
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (list, callback = ()=>{console.log('successful batch save!')}) => {
  let cleanlist = []
  JSON.parse(list.body).map((entry)=>{
    cleanlist.push({
      name : entry.owner.login,
      repoName : entry.name,
      stars : entry.stargazers_count,
      watchers : entry.watchers_count,
      url : entry.owner.html_url,
      reposUrl : entry.html_url,
      description : entry.description,
    });
  })
  Repo.insertMany(cleanlist.map(futuredoc=>new Repo(futuredoc)), (err)=>{
    if(err){console.log(err);
    }else{
      callback()
    }
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
module.exports.Repo = Repo;