var path = require("path");
var fs = require("fs");

module.exports = function (app){
    var dbPath = path.resolve(__dirname, "../db/db.json")
    
    app.get("/api/notes", function(req, res){
        fs.readFile(dbPath, "utf8", function(err, data){
            if(err){
                return console.log(err);
            }
            var parsed = JSON.parse(data)
            console.log(parsed)

            res.json(parsed)
        })
    })
}