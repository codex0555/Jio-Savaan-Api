const express = require('express');
const axios = require('axios');
const cors = require('cors');
const decryptmodule = require('./app.js');
const lyricsmixture = require('./lyricsmix.js');


const song = express();
song.use(cors());

const songapi = `https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=`;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

song.get('/song/:id', async ( req, res )=>{
    const songunique = encodeURIComponent(req.params.id);
    if(songunique === ""){
        res.status(400).send("may be not valid");
    }

    const songk = songapi + songunique;
    const songlink = await axios.get(songk, {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const songres = songlink.data;
    const encrypt = songres[songunique]?.encrypted_media_url || null;
    const songID = songres[songunique]?.id || null;

    if( songres[songunique] ){
        delete songres[songunique].encrypted_media_url;
        delete songres[songunique].encrypted_drm_media_url;
        delete songres[songunique].encrypted_media_path;
        //delete songres[songunique];
    }

    const encryptedValue = encrypt;

    // Decrypt and display the result in the console
   const result = decryptmodule(encryptedValue);
   console.log('Decrypted Links:', result);

   const lyricst = await lyricsmixture(songID);
   console.log('value', lyricst);

    res.json({ songres, result, lyricst});

    console.log(songres);
});


module.exports = song;

