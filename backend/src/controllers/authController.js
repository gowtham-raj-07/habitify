import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password) return res.status(400).json({message: "Please provide name,email and password"});

        let user = await User.findOne({email});
        if (user) return res.status(400).json({message: "User email already exists"});

        let passwordHash = await bcrypt.hash(password,10);

        user = new User({name,email,password:passwordHash});
        await user.save();

        let payload = {userId : user._id};
        let token = jwt.sign(payload,process.env.secret_key,{expiresIn : "7d"});

        res.json({token, user:{id: user._id, name: user.name ,email: user.email,}});
        console.log(token);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) return res.status(400).json({messgae: "Please provide email and Password"});

        let user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Credentials"});

        let isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid Credentials"});

        let payload = {userId: user._id};
        let token = jwt.sign(payload,process.env.secret_key,{expiresIn: "7d"});

        res.json({token, user:{id: user._id, name: user.name, email: user.email}});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};