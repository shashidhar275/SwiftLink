const { getUser } = require('../service/auth');

const restrictToLoggedinUserOnly = async (req,res,next)=>{
    const userUid = req.headers['Authorization'];
    
    if(!userUid) return res.redirect('/login');
    const token = userUid.split(' ')[1]; //"Bearer 534452l1kj3"
    const user = getUser(token);  
    
    if(!user) return res.redirect('./login');

    req.user = user;
    next();
}

const checkAuth = async (req,res,next)=>{
    const userUid = req.headers['authorization'];
    const token = userUid.split(' ')[1];
    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = { restrictToLoggedinUserOnly , checkAuth };