import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

export const validation = (req:Request, res: Response, next:NextFunction)=>{
    console.log('came to validation');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError("Invalid Request", errors.array());
    }
    next();
    console.log("here");
};
