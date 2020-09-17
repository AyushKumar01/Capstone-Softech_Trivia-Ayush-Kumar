const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next){
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, data) => {
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

// const verifyToken = function(req, res) {
//   if(req.headers.authorization){
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, JWT_SECRET, (err, data) => {
//       if(err){
//         console.log("error");
//         return { error : err };
//       }else{
//         console.log("success");
//         return { error : "true" };
//       }
//     });
//   } else{
//     console.log("no token");
//     return { error : "JsonWebTokenError" };
//   }
//     // const bearerHeader = req.headers['authorization'];
  
//     // if (bearerHeader) {
//     //   const bearer = bearerHeader.split(' ');
//     //   const bearerToken = bearer[1];
//     //   req.token = bearerToken;
  
//     //   jwt.verify(req.token, JWT_SECRET, (err, data) => {
//     //   if(err){
//     //     return res.json({
//     //       error: err
//     //       // ,
//     //       // status: 403
//     //     });
//     //   }});
//     //   return true;
//     // } else {
//     //   // Forbidden
//     //   res.sendStatus(403);
//     // }
// };

module.exports = verifyToken;