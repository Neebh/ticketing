import  express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";
import { ServerError } from "../errors/ServerError";
import { validation } from "../middlewares/validations";

const router = express.Router();

router.post('/api/users/signin', 
body('email').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),

validation,
(req, res)=>{
    res.send("Hi Signin");
});

export {router as signinRouter};


