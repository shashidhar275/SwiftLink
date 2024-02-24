const express = require('express');
const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connection');

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log('MongoDb connected'));

app.use(express.json());

app.use('/url', urlRoute);

const URL = require('./models/url');
app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{$push: { 
        visitHistory: { timestamp: Date.now()}//It was not working for using word timeStamp
    }})
    if(!entry) return res.status(404).json({'Status': 'Invalid shortId provided'});
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});
