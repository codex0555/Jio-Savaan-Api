const express = require('express');
const axios = require('axios');
const cors = require('cors');

const playlistapi = `https://www.jiosaavn.com/api.php?__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid=`;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";


const playlist = express();
playlist.use(cors());

playlist.get('/playlist?id=', async ( req, res )=>{
    try {
        const playlistmust = req.query.id;
    if( playlistmust === ""){
        res.status(400).send("not PS");
    }
    const playlistbut = playlistapi + playlistmust;
    const playlistline = await axios.get(playlistbut, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const playlisty = playlistline.data;

    res.json({ playlisty});
    } catch (error) {
        console.log('eroooorrr');
    }
});

module.exports = playlist;