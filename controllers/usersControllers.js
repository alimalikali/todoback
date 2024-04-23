const catchAsync = require("../utils/catchAsync");
const User = require("./../models/usersModels");
const jwt = require("jsonwebtoken");


const createToken =(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'})
}


exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const token = createToken(user._id);
  res.status(200).json({
    status: "success",
    message: "user signup successfully",
    email ,
    token
  });
});

exports.signUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.signup(email, password);

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    message: "user signup successfully",
    email ,
    token
  });
});
