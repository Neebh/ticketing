import express from "express";
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from "../errors/RequestValidationError";
import { User } from "../models/User";
import JWT from "jsonwebtoken";
import { validation } from "../middlewares/validations";
import { ExistingUser } from "../errors/ExistingUser";

const router = express.Router();

router.post('/api/users/signup',
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    validation,
    async (req, res) => {
        const { email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser !==null){
            console.log("Came here email in use");
            throw new ExistingUser("Email already in use");
        }

        const user = User.build({email, password});
        await user.save();
        const jwtToken = JWT.sign({id:user._id, email:user.email}, process.env.JWT_KEY!);
        console.log(jwtToken);
        req.session = {
            jwt: jwtToken
        };

        res.send(user);
    });



export { router as signupRouter };


