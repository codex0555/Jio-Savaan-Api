const express = require('express');
const search = require('./routes/search.js');
const song = require('./routes/song.js');
const playlist = require('./routes/playlist.js');
const lyrics = require('./routes/lyrics.js');
const album = require('./routes/album.js');

const PORT = 3000;
const index = express();

index.get('/', async ( req, res )=>{
    res.status(200).send("The Jio Savaan ApI Is ON Sir...");
    //res.status(400).send("ApI Power Off");
});

index.use('/api', search);
index.use('/api', song);
index.use('/api', playlist);
index.use('/api', lyrics);
index.use('/api', album);

index.listen(PORT, ()=>{
    console.log("You are here sir");
})
