const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly , checkAuth } = require('./middlewares/auth');
const { connectToMongoDb } = require('./connection');


const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');


connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log('MongoDb connected'));

app.set('view engine','ejs');//For SSR
app.set('views',path.resolve('./views'));//Providing the info about the ejs files are present in views folder for express

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user',userRoute);
app.use('/', checkAuth, staticRoute);

app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});
