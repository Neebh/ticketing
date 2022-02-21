import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError{

    errorCode= 400;

    constructor(message:string, private reasons:ValidationError[]){
        super(message);
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; } []{
        return this.reasons.map((res)=>{
            return {
                message: res.msg,
                field: res.param
            }
        });
    }
};

