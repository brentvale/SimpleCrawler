var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
//for email validation
var validator = require('validator');

var pagesToVisit = ["https://www.yelp.com/biz/jacklin-poladian-md-pasadena"];

for(var i = 0; i < pagesToVisit.length; i++){
  request(pagesToVisit[i], function(error, response, body) {
     if(error) {
       console.log("Error: " + error);
     }
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode === 200) {
       // Parse the document body
       var $ = cheerio.load(body);
       var phone = searchForPhoneNumber($);
       if(phone){
         console.log("phone number is: " + phone)
       }
     }
  });
}

function searchForPhoneNumber($) {
  var bodyText = $('html > body').text();
  var matched = bodyText.match(/\(\d{3}\)\s\d{3}-\d{4}/) || stringToMatch.match(/\d{3}-\d{3}-\d{4}/);
  if(matched){
    return matched;
  }
  return false;
}