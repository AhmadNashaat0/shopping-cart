const jwt = require('jsonwebtoken');

const admin = (req,res,next)=>{
    try{
        const admin = req.user.admin;
        if(!admin){
            throw new Error('you have no premission');
        }
        next();
    }catch(e){
        res.status(200).send(e.message);
    }
}
module.exports = admin;