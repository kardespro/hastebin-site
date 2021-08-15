const express = require("express");
const app = express();
const {
    JsonDatabase,
    YamlDatabase
} = require("wio.db");

const db = new JsonDatabase({
  databasePath:"./Database/paste.json"
});
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", (request, response) => {
  response.render("home");
  
});
app.post("/", (req, res) => {
//Paste ID
  function make_paste_id(length) {
    var result = "";
    var characters =
      "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
var make = make_paste_id(10);
  var negoB = req.body;
  var Data = {
    author: negoB["author"],
    paste: negoB["paste"],
    paste_language: negoB["pastelang"],
    paste_id: make
  };
  db.push(`paste_${make}`,Data);
  res.redirect(`/paste/${make}/`);

});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
