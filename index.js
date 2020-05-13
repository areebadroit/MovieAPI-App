var express = require('express');
var app = express();
var request = require('request');

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/results", (req, res) => {
    var query = req.query.searchQuery;
    console.log(query);
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    console.log(url);
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            if(data.Response === "False"){
                res.render("error");
            }
            res.render("results", {data: data});
        }
    });
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Movie app started on port 3000");
});