const {Router}= require("express");
const config =require("config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {check,validationResult}= require("express-validator");
const bcrypt = require("bcryptjs");
const router = Router();

router.post("/register",
    [
        check("email","wrong email").isEmail(),
        check("password","minimum length is 6").isLength({min: 6})
    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "entered data is invalid"
            })
        }
        const {email,password} = req.body;
        const condidate = await User.findOne({email});
        if(condidate){
         return  res.status(400).json({message: "we have acount with this email"})
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const user = new User({email,password:hashedPassword});

        await user.save();
        console.log(user);
        res.status(201).json({message: `user  created`})
    }catch (e) {
       res.status(500).json({message: "something goes wrong"})
    }
});
router.post("/login",
    [
        check("email","enter valid email").normalizeEmail().isEmail(),
        check("password","enter password").exists()
    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "login data is invalid"
            })
        }
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(
                {message: "user nor found"}
            )
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "wrong password"
            })
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            {expiresIn: "1h"}
        )
        res.json({token,userId: user.id})

    }catch (e) {
        res.status(500).json({message: "something goes wrong"})
    }
});

module.exports = router;