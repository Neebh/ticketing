import express, { NextFunction, Request, Response }  from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
    err: CustomError, req: Request, res: Response, next:NextFunction)=>{
    console.log("Middleware"+err);

    if(err instanceof CustomError){
        return res.status(400).send({
            "errors": err.serializeError()
        });   
    }
    
    return res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    });
};
