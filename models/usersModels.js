const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const AppError = require("../utils/appError");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new AppError("All Fields Must Be Filled", 404);
  }
  if (!validator.isEmail(email)) {
    throw new AppError("this is not valid email", 404);
  }
  if(!validator.isStrongPassword(password)){
    throw new AppError("this is not strong password ,it should contain upper and lower case letter,numbers and special character", 404);
  }

  const checkUser = await this.findOne({ email });
  if (checkUser) {
    throw new AppError("email alredy in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login=async function(email,password){
    if (!email || !password) {
        throw new AppError("All Fields Must Be Filled", 404);
      }
      const user = await this.findOne({ email });
      if (!user) {
        throw new AppError("incorrect email");
      }
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw new AppError("incorrect password");
      }

    return user;
}

module.exports = mongoose.model("User", userSchema);
