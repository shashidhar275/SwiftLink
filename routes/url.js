const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl, handleGetAnalytics ,handleDeleteShortUrl} = require('../controllers/url');

router.post('/', handleGenerateNewShortUrl );
router.delete('/:shortId', handleDeleteShortUrl); //Contribution

router.get('/analytics/:shortId',handleGetAnalytics)
module.exports = router ; //Do not use {router} will get an error