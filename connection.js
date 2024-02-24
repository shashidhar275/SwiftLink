const mongoose = require('mongoose');

async function connectToMongoDb(url){ //I think there is no need for using the async here
    return mongoose.connect(url);
}

module.exports = { connectToMongoDb };