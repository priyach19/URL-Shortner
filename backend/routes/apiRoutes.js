const express = require("express");
const router = express.Router();
const Urls = require("../models/urls");
const randomString = require('randomstring');

// create short url 
router.post('/short', async (req, res) => {
    const { originalUrl } = req.body;
    const compressedCode=randomString.generate(8)
    // Generate short link (you can use a library like shortid or nanoid)
    
    const url = await Urls.create({ originalURL: originalUrl, 
        shortenedURL: `http://localhost:5000/${compressedCode}`,
        visited: 0, 
        compressedcode: compressedCode
    })
  
    return res.status(200).json({ shortenLink: url.shortenedURL,
    visited:url.visited,
    compressedcode:url.compressedcode
 })
   
  });

 
  router.get('/analytics', async (req, res) => {
    const userId = req.user.userId;
    const urls = await Urls.find({ userId }).sort({ createdAt: 'desc' });
    res.json(urls);
  });

  module.exports=router;