const Signin = require('../Model/SigninSchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.createUser = async (req, res) => {
    const { userName, email, password, repeatPassword } = req.body;
    console.log(req.body);
    try {

        const existUser= await Signin.findOne({ email });
        console.log(existUser);
        
        if(existUser){
            res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Signin.create({
            userName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    }
    catch (error) {
        res.status(400).json({ message: "Server Error" });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Signin.find();
        res.status(200).json({
            success: true,
            data: users,
            message: "Users fetched successfully"
        });
    }
    catch (error) {
        res.status(400).json({ message: "Server Error" });
    }
}

exports.getUserByEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Signin.findOne({ email });
        console.log(user);


        if (!user) {
         res.status(401).json({
                message: "Login First: User not found",
                success: false
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }


        // if (user.password !== password) {
            // res.status(401).json({
                // message: "Invalid email or password"
        //     });
        // }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });

        console.log(token);

        res.status(200).json({
            success: true,
            data: user,
            token: token,
            message: "User fetched successfully",
        })

    }
    catch (error) {
        res.status(400).json({ success: false, message: "Server Error" });
    }
}

