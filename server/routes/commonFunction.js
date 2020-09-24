const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//common function to verify token before api calls
function verifyToken(req, res, next){
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, _data) => {
      if(err){
        // console.log("error");
        return res.json( {error : err } );
      }else{
        // console.log("success");
        next();
      }
    });
  }else{ 
     return res.json({
        response:"login"
     })
  }
}
module.exports = verifyToken;