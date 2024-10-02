const jwt = require("jsonwebtoken");
const User = require("../Model/User_model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      if (verified) {
        const user = await User.findOne({ _id: verified._id });
        if (user) {
          req.user = user;
          req.token = token;
          console.log("authMiddleware pass sucessfully");
          next();
        } else {
          console.log("authMiddleware fail to pass");
          res.status(401).send("Access Denied");
        }
      } else {
        res.status(401).send("Access Denied");
      }
    } else {
      console.log("authMiddleware fail to pass");
      res.status(401).send("Access Denied");
    }
  } catch (err) {
    console.log("authMiddleware fail to pass");
    next(err);
  }
};

module.exports = authMiddleware;
