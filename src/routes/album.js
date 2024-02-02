const express = require('express');
const axios = require('axios');
const cors = require('cors');
const decryptmodule = require('./app.js');

const album = express();

const albumlink = `https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid=`;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

album.use(cors());

album.get('/album/:id', async ( req, res)=>{
    try {
        const albumduck = req.params.id;
    if( albumduck === ""){
        res.status(400).send('no album here');
    }
    const albumbee = albumlink + albumduck; 
    const albumsong = await axios.get(albumbee, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const albumres = albumsong.data;
    const albumline = albumres.songs[0].encrypted_media_url;

    if( albumres.songs[0]){
        delete albumres.songs[0].encrypted_media_url;
        delete albumres.songs[0].encrypted_media_path;
        delete albumres.songs[0].encrypted_drm_media_url;
    }

    const result = decryptmodule(albumline);

    res.json({ albumres, result});

    } catch (error) {
        console.log('eroor albummmmmmmm')
    }
});


module.exports = album;