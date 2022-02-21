import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class ServerError extends Error implements CustomError {
    errorCode= 500;
    reasons= "Server Error"
    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this, ServerError.prototype);
    }

    getReasons(){
        return this.reasons;
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        let arr = [];
        arr.push({
            message: this.reasons
        });
        return arr ;
    }
};
