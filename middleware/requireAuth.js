const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("./../models/usersModels");

const  requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new AppError("authorization token required", 401));
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({_id}).select('_id');
    next(); 
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
