const axios = require('axios');
const lyricsjio = `https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=`;

const lyricsmixture = async (songID)=>{
    const lyricsKrittika = lyricsjio + songID;
    if( songID !== ""){
        const lyricslove = await axios.get(lyricsKrittika);
        const lyricsinsta = lyricslove.data;
    
        console.log(lyricsinsta);
        return lyricsinsta;
    }
    else{
        return null;
    }
    
};

module.exports = lyricsmixture;