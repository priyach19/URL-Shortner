const Url = require('../models/urls');
const shortid = require('shortid');

// Controller for creating a shortened URL
module.exports.createShortUrl = async function (req, res) {
    try {
        const { redirectURL } = req.body;

        // Validate if redirectURL is provided
        if (!redirectURL) {
            return res.status(400).json({ message: 'Please provide a URL to shorten' });
        }

        // Generate a unique short ID using the shortid library
        const shortURL = shortid.generate(8);

        // Save the URL in the database
        const urlEntry = await Url.create({
            shortURL,
            redirectURL,
            user: req.userId, // Access userId set by verifyToken middleware
        });

        // Return success response with the short URL and original URL
        return res.status(201).json({
            shortURL: urlEntry.shortURL,
            redirectURL: urlEntry.redirectURL,
        });
    } catch (error) {
        // Handle errors during URL creation
        console.error('Error in createUrl:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller for redirecting to the original URL
module.exports.redirectToOriginalUrl = async function (req, res) {
    try {
        const shortURL = req.params.shortURL; // Assuming you are passing the short URL as a route parameter

        // Find the corresponding entry in the database based on the short URL
        const urlEntry = await Url.findOne({ shortURL });

        // If the short URL is not found, return a 404 error
        if (!urlEntry) {
            return res.status(404).json({ message: 'Shortened URL not found' });
        }

        // Redirect to the original URL
        return res.redirect(urlEntry.redirectURL);
    } catch (error) {
        // Handle errors during URL redirection
        console.error('Error in redirectToOriginalUrl:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};