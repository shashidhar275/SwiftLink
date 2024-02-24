const shortid  = require('shortid');
const URL = require('../models/url');

const handleGenerateNewShortUrl = async (req,res)=>{
    const body = req.body;
    if(!body.url) return res.status(400).json({'status': 'Url is required'});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    });
    res.status(201).json({'Id':shortId});
};

const handleGetAnalytics = async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

const handleDeleteShortUrl = async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOneAndDelete({shortId});
    if(!result) return res.status(404).json({'status': 'Invalid shortId provided'});
    res.json({'status':'Deletion success'});
}
module.exports = { handleGenerateNewShortUrl , handleGetAnalytics, handleDeleteShortUrl};