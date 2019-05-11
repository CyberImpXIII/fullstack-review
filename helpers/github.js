const request = require('request');
const config = require('../config.js');

let getReposByUsername = (query, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${query}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  console.log("running")
  request(options, (err, res, body)=>{
    if(err){
      callback(err, null);
    }else{
      callback(null, {"response": res, "body": body});
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;