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
            

            res.json(parsed)
        })
    })

    app.post("/api/notes", function(req, res){
        var newNote = req.body
        fs.readFile(dbPath, "utf8", function(err, data){
            if(err){
                return console.log(err);
            }
            var parsed =JSON.parse(data)
            var lastIndex = parsed.length - 1
            var lastId = parsed[lastIndex].id
            newNote.id = lastId + 1
            parsed.push(newNote)
            //might need to push new note to parsed then write parsed to file
            fs.writeFile(dbPath, "utf8", JSON.stringify(newNote), function(req, res){
                res.json(newNote)
            })
        })
    }
    )

    app.delete("/api/notes/:id"), function(req, res){
        var id = req.params.id;
        dbPath.splice(id - 1, 1);
        dbPath.forEach(function(obj, i){
            obj.id = i + 1;
        })
        fs.writeFile(dbPath, JSON.stringify(newNote), function(){
            res.json(newNote)
        })
    }
}