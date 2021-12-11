const conn = require('../config')
const fs = require('fs');
const jwt = require('jsonwebtoken')
exports.login = function(req, res){
    var n = req.body 
    console.log(n.name)
    conn.connection.connect(function(err) {
        if (err) throw err;
        conn.connection.query("SELECT * FROM studenTrack WHERE name='"+n.name+"' AND password='"+n.password+"'", 
        function (err, result){
          if (err) throw err;
          const token = jwt.sign({id: result[0].id}, "poiuytrewsdfghjkmnbvcxsdfghjkmnbv")
          console.log(token)
          res.send(token)
        });
      });
    
}

exports.stream = function(req,res){
  const range = req.headers.range;
    const videoPath = 'https://www.youtube.com/watch?v=bjzI5NN6dfY&ab_channel=ThinkMusicIndia';
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize -1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
}
