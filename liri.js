var axios = require("axios");
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

    case "venue": seatGeek()
        break;
        
    default:
        inquirerUser()
}
}
// console.log(3-3||"zero");
// console.log(3-2||"zero");
console.log(process.env.SPOTIFYID);
function spotifyIt(){
    
    console.log("you are trying to spotify "+ query)
}
function findMovie(){
    console.log("you are trying to find this movie "+ query)
}
function seatGeek(){
    console.log("you are trying to find this venue "+ query)
}
function inquirerUser(){
    console.log("you don't know how to use liri")
}