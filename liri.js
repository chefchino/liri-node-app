var axios = require("axios");
var omdb =require("omdb");
require("dotenv").config();
var [,,command]=process.argv// array destructuring
var removed=process.argv.splice(0,3)
var query=process.argv.join(" ")
//console.log(process.argv)
switchIt()
function switchIt(){
switch (command){
    case "spotify": spotifyIt()
        break;

    case "movie": findMovie()
        break;

    case "venue": bit()
        break;
        
    default:
        inquirerUser()
}
}
// console.log(3-3||"zero");
// console.log(3-2||"zero");
// console.log(process.env.SPOTIFYID);
function spotifyIt(){
    
    console.log("you are trying to spotify "+ query)
}
function findMovie(){
    console.log("you are trying to find this movie "+ query)
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title + "\nRelease Date: " + response.data.Released
            + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
            response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + 
            "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors)
            console.log("\n-------------------------\n")
        })
        .catch(function(error) {
            if (error.response) {
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
}
function bit(){
    console.log("you are trying to find this venue "+ query)
    var bitURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    axios.get(bitURL).then(
        function(response1) {
            console.log("Venue Name: " + response1)
        }
    )
}
function inquirerUser(){
    console.log("you don't know how to use liri")
}