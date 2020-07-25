var path = require("path");
var fs = require("fs");
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");

module.exports = function (app){
    var dbPath = path.resolve(__dirname, "../db/db.json")
    
    app.get("/api/notes", function(req, res){
        fs.readFile(dbPath, "utf8", function(err, data){
            if(err){
                return console.log(err);
            }
            var parsed = JSON.parse(data);
            console.log(parsed)

            res.json(parsed)
        })
    })
    app.post("/api/notes", function(req, res){
    
        var newNote = req.body;

        fs.readFile(dbPath, "utf8", function(err, data){
            var noteList = JSON.parse(data);
            var lastIndex = noteList.length - 1;
            var lastId = parseInt(noteList[lastIndex].id);
            newNote.id = lastId + 1;
            noteList.push(newNote);

            fs.writeFile(dbPath, JSON.stringify(noteList), function(req, res){
                return;
            })
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
        //console.log(req);
        
        var id = parseInt(req.params.id);
        //console.log(id);

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
             fs.writeFile(dbPath, JSON.stringify(noteList), function(req, res){
                return;
            })
        })
        
        

        // dbPath.splice(id - 1, 1);
        // dbPath.forEach(function(obj, i){
        //     obj.id = i + 1;
        // })
        // fs.writeFile(dbPath, JSON.stringify(newNote), function(){
        //     res.json(newNote)
        // })
    })
} 
