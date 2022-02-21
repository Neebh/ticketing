import { CustomError } from "./CustomError";

export class ExistingUser extends CustomError{

    errorCode= 400;

    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this, ExistingUser.prototype);
    }

    serializeError(){
        return [{message: this.message}];
    };

};

