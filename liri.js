var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
require("dotenv").config();
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFYID,
  secret: process.env.SPOTIFYSECRET
});
var [, , command] = process.argv// array destructuring
var removed = process.argv.splice(0, 3)
var query = process.argv.join(" ")
//console.log(process.argv)
switchIt()
function switchIt() {
    switch (command) {
        case "spotify": spotifyIt()
            break;

        case "movie": findMovie()
            break;

        case "venue": bit()
            break;

        case "do-what-it-says": dwis()
            break;

        default:
            inquirerUser()
    }
}
// console.log(3-3||"zero");
// console.log(3-2||"zero");
// console.log(process.env.SPOTIFYID);
function spotifyIt() {
    console.log("you are trying to spotify " + query);
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //    console.log(data.tracks.items[0].album.name)
    //   console.log(JSON.stringify(data, null, 10)); 
    var text = "Spotify This Song: " + query + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " +
    data.tracks.items[0].name + "\nLink to Song: " + data.tracks.items[0].preview_url 
+ "\nAlbum: " + data.tracks.items[0].album.name + "\n--------\n";

fs.appendFile("log.txt", text, function(err) {

  if (err) {
    console.log(err);
  }
      console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " +
          data.tracks.items[0].name + "\nLink to Song: " + data.tracks.items[0].preview_url 
    + "\nAlbum: " + data.tracks.items[0].album.name);
      console.log("\n-------------------------\n")
      
    });

});
}
function findMovie() {
    console.log("you are trying to find this movie " + query)
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            var text = "Movie Information: " + "\nTitle: " + response.data.Title + "\nRelease Date: " + response.data.Released
            + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
            response.data.Ratings[1].Value + "\nCountry: " + response.data.Country +
            "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot +
            "\nActors: " + response.data.Actors + "\n--------\n";

fs.appendFile("log.txt", text, function(err) {

  if (err) {
    console.log(err);
  }
            console.log("Title: " + response.data.Title + "\nRelease Date: " + response.data.Released
                + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
                response.data.Ratings[1].Value + "\nCountry: " + response.data.Country +
                "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors)
            console.log("\n-------------------------\n")
        })
        .catch(function (error) {
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
})
}
function bit() {
    console.log("you are trying to find this venue " + query)
    var bitURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    axios.get(bitURL).then(
        function (response1) {
            var randomDate = response1.data[0].datetime.slice(0, 10);
            var randomFormat = "YYYY/MM/DD";
            var convertedDate = moment(randomDate, randomFormat);
            var text = "Venue for: " + query + "\nVenue Name: " + response1.data[0].venue.name + "\nCountry: " + response1.data[0].venue.country
            + "\nRegion/State: " + response1.data[0].venue.region + "\nCity: " + response1.data[0].venue.city + 
           "\nDate of Event: " + convertedDate.format("MM/DD/YYYY") + "\n--------\n";

fs.appendFile("log.txt", text, function(err) {

  if (err) {
    console.log(err);
  }
            console.log("Venue Name: " + response1.data[0].venue.name + "\nCountry: " + response1.data[0].venue.country
             + "\nRegion/State: " + response1.data[0].venue.region + "\nCity: " + response1.data[0].venue.city + 
            "\nDate of Event: " + convertedDate.format("MM/DD/YYYY"));
            console.log("\n-------------------------\n")
        })
})
}
function dwis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        var output = data.split(",");
      
        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {
            query = output[i];
            spotifyIt();
         
        }
      });
}
function inquirerUser() {
    console.log("you don't know how to use liri")
}