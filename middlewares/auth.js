const { getUser } = require('../service/auth');

//Authentication
const checkForAuthentication = (req,res,next)=>{
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();
    
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

//Authorization
const restrictTo = (roles = [])=>{ //Closure => as we want transfer roles field to the middleware we must have to use the closures
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end('UnAuthorized');

        return next();
    }
}
module.exports = { checkForAuthentication , restrictTo };