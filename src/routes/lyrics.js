const express = require('express');
const axios = require('axios');
const cors = require('cors');

const lyricsapi = `https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=`;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

const lyrics = express();
lyrics.use(cors());

lyrics.get('/lyrics/:id', async ( req, res )=>{
    try {
        const lyricsnew = req.params.id;
        const lyricsmix = lyricsapi + lyricsnew;
        const lyricsline = await axios.get(lyricsmix, {
            headers:{
                'User-Agent': USER_AGENT,
            }
        });
        const lyricsrest = lyricsline.data;

        res.json({ lyricsrest});
    } catch (error) {
        console.log('erorrr lyricsss')
    }
});


module.exports = lyrics;