const express = require('express');
const axios = require('axios');
const cors = require('cors');

const search = express();
const searchlink = `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=`;

const USER_AGENT ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

search.use(cors());

search.get('/search', async ( req, res)=>{
    try {
        const qparameter = encodeURIComponent(req.query.q); 
    if( qparameter === ""){
        //return null;
        res.status(400).send( "message : nope" );
    }


    const searchapi = searchlink + qparameter;
    const searchcorn = await axios.get(searchapi , {
        headers:{
            'User-Agent': USER_AGENT,
        }
    });
    const searchhub = searchcorn.data;

    res.json({ searchhub});

    console.log(searchhub);
    } catch (error) {
        console.log("error occour");
        res.status(400).send("wrong req");
    }
})


module.exports = search ;