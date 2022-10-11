import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

    const handleError = (res, error) => {
        res.status(500).send(error.message);
    };

    const generateToken = (role, firstname) => {
            const payload = {
                role,
                firstname
            };
            return jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: "24h"});
        };

    export const registration = (req, res) => {
            const {email, password, lastname, firstname} = req.body;
            UserModel.findOne({email})
            .then((user) => {
                if(user) {
                    return res.status(400).json({message: 'the email is already in the database'});
                }
                if(email && password){
                    const hashPassword = bcrypt.hashSync(password, 10);
                    new UserModel({email, password: hashPassword, lastname, firstname})
                    .save();
                    return res.status(200).json({message:'registration successfully'});
                }
                else return res.status(400).json({message: 'username or passoword is empty'});
            })
            .catch((error) => handleError(res, error));
    };

    export const login = (req, res) => {
            const {email, password} = req.body;
                UserModel.findOne({email})
            .then((user) => {
                if(!user) {
                    return res.status(400).json({message: 'user not fount'});
                }
            const validPassword = bcrypt.compareSync(password, user.password);
                if(!validPassword) {
                    return res.status(400).json({message: 'wrong password'});
                }
            const token = generateToken(user.roles, user.firstname);
                    return res.json({token});
            })
            .catch((error) => handleError(res, error));
    };

    