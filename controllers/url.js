const shortid  = require('shortid');
const URL = require('../models/url');

const handleGenerateNewShortUrl = async (req,res)=>{
    const body = req.body;
    if(!body.url) return res.status(400).json({'status': 'Url is required'});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render('home',{
        'Id':shortId
    })
};

const handleGetAnalytics = async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
};

const handleDeleteShortUrl = async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOneAndDelete({shortId});
    if(!result) return res.status(404).json({'status': 'Invalid shortId provided'});
    return res.json({'status':'Deletion success'});
};

const handleGetSite = async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{$push: { 
        visitHistory: { timestamp: Date.now()}//It was not working for using word timeStamp
    }})
    if(!entry) return res.status(404).json({'Status': 'Invalid shortId provided'});
    return res.redirect(entry.redirectURL);
};

module.exports = { handleGenerateNewShortUrl , handleGetAnalytics, handleDeleteShortUrl ,handleGetSite};