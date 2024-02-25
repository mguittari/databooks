const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // recup le token
    const headers = req.get("Authorization");
    // check token
    const [type, token] = headers.split(" ");
    if (type === "Bearer") {
      const { payload } = jwt.verify(token, process.env.SECRET_KEY_JWT);

      req.payload = payload;
      next();
    } 
  } catch (error) {
    res.status(401).send(error);
  }
  
};



module.exports = { verifyToken };