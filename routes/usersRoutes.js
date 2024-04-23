const express = require("express");
const {  loginUser, signUser } = require("../controllers/usersControllers");


const router = express.Router();


router.post('/login',loginUser);

router.post('/signup',signUser);






module.exports = router;