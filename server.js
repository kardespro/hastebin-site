const express = require("express");
const app = express();
const {
    JsonDatabase,
    YamlDatabase
} = require("wio.db");

const db = new JsonDatabase({
  databasePath:"./Database/paste.json"
});
//Paste Siler
//cooming soon xd
setTimeout(function(){
  
}, 3000);
var bodyParser = require("body-parser");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", (request, response) => {
  var negoSize = db.size
  var dbVersion = db.info.version
  response.render("home",{negoSize,dbVersion});
  
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
    pasteName: negoB["pastename"],
    paste: negoB["paste"],
    paste_language: negoB["pastelang"],
    paste_id: make
  };
  db.set(`paste.${make}`,Data);
  res.redirect(`/paste/${make}/`);

});
app.get("/paste/:pasteID", (req, res) => {
 var pasteCheck = db.fetch(`paste.${req.params.pasteID}`);
  if(!pasteCheck) return res.json("unkown");
  var pasteData = db.fetch(`paste.${req.params.pasteID}`);
  var pasteName = db.fetch(`paste.${req.params.pasteID}`).pasteName
  db.add(`pasteViewCount.${req.params.pasteID}`,+1);
  var viewCount = db.fetch(`pasteViewCount.${req.params.pasteID}`);

  
  res.render("paste-goruntule",{pasteData,viewCount});
  });

app.get("/raw/:pasteID", (req, res) => {
 var pasteCheck = db.fetch(`paste.${req.params.pasteID}`);
  if(!pasteCheck) return res.json("unkown");
  var pasteData = db.fetch(`paste.${req.params.pasteID}`);
  var pasteName = db.fetch(`paste.${req.params.pasteID}`).pasteName

  res.write(pasteData.paste);
  
  });
app.get("/api/:pasteID/tojson", (req, res) => {
 var pasteCheck = db.fetch(`paste.${req.params.pasteID}`);
  if(!pasteCheck) return res.json("unkown");
  var pasteData = db.fetch(`paste.${req.params.pasteID}`);
  var pasteName = db.fetch(`paste.${req.params.pasteID}`).pasteName
var viewCount = db.fetch(`pasteViewCount.${req.params.pasteID}`);


  
  var Data = {
  pasteName:pasteData.pasteName,
  paste: pasteData.paste,
  paste_id:pasteData.paste_id,
  pasteLang: pasteData.paste_language,
  viewers: viewCount
}
  res.json(Data);
  
  });
app.get("/api/database", (req, res) => {
  res.json({size:db.size});
  });


console.log(db.fetch(`paste`));
var test  = db.fetch(`paste.FJEAnrKbiA`)
console.log(test.pasteName);
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
