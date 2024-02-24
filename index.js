const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require('./connection');

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log('MongoDb connected'));

app.set('view engine','ejs');//For SSR
app.set('views',path.resolve('./views'));//Providing the info about the ejs files are present in views folder for express

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/test',async (req,res)=>{
    const allDbUrls = await URL.find({});
    res.render('home',{
        urls: allDbUrls
    });
});

app.use('/url', urlRoute);
app.use('/',staticRoute);

app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});
