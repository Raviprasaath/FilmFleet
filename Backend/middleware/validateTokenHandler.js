const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next)=> {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
            if(err) {
                res.status(401);
                throw new Error("User Not authorized") 
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("Token missing");
        }
    } else if (authHeader) {
        token = authHeader;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
            if(err) {
                res.status(401).send("User Not authorized") 
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401).send("Token missing");
        }
    }
}

module.exports = validateToken;