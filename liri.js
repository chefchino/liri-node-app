// var command = process.argv[2];
// var query = process.argv[3];\
require("dotenv").config();
var [,,command]=process.argv// array destructuring
var removed=process.argv.splice(0,3)
var query=process.argv.join(" ")
//console.log(process.argv)
switchIt()
function switchIt(){
switch (command){
    case "spotify-this-song": spotifyIt()
        break;
        //other 3
    default:
        inquirerUser()
}
}
console.log(3-3||"zero");
console.log(3-2||"zero");
console.log(process.env.STUDENT);
function spotifyIt(){
    console.log("you are trying to spotify "+ query)
}
function inquirerUser(){
    console.log("you don't know how to use liri")
}