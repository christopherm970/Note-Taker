var path = require("path");
var fs = require("fs");

module.exports = function (app){
    var dbPath = path.resolve(__dirname, "../db/db.json")
    
    app.get("/api/notes", function(req, res){
        fs.readFile(dbPath, "utf8", function(err, data){
            if(err){
                return console.log(err);
            }
            var parsed = JSON.parse(data);
            res.json(parsed)
        })
    })
    app.post("/api/notes", function(req, res){
    
        var newNote = req.body;

        fs.readFile(dbPath, "utf8", function(err, data){
            var noteList = JSON.parse(data);

            var lastId = 0;
            if(noteList.length === 0) {
                // no data, make new array
                noteList = new Array();
            } else{
                var lastIndex = noteList.length - 1;
                lastId = parseInt(noteList[lastIndex].id);
            }

            newNote.id = lastId + 1;
            noteList.push(newNote);

            fs.writeFile(dbPath, JSON.stringify(noteList), function(err){
                if(err) throw err;
                return true;
            })
            res.json(noteList);
        })
        //fs.readFile(dbPath, "utf8", function(err, data){
        //    if(err){
        //        return console.log(err);
        //    }
            //console.log(data);
            //var parsed =JSON.parse(data);
            //var lastIndex = parsed.length - 1;
            //var lastId = parsed[lastIndex].id
            //newNote.id = lastId + 1
            //parsed.push(newNote);
            //might need to push new note to parsed then write parsed to file
            //fs.writeFile(dbPath, "utf8", JSON.stringify(newNote), function(req, res){
            //    res.json(newNote);
            //})
        //})
    })
    app.delete("/api/notes/:id", function(req, res){
        
        var id = parseInt(req.params.id);

        fs.readFile(dbPath, "utf8", function(err, data){
             if(err){
                 console.log(err);
             }
             var noteList = JSON.parse(data);

             //iterate through file to find match
             // delete match
             for(var i = noteList.length - 1; i >= 0; i--) {
                if(noteList[i].id === id) {
                    noteList.splice(i, 1);
                }
            }

             //save new file
             fs.writeFile(dbPath, JSON.stringify(noteList), function(err){
                if (err) throw err;
                return true;
            })
            res.json(noteList);
        })
    })
} 
