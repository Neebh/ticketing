import { Schema } from "express-validator";
import mongoose from "mongoose";
import { Password } from "../services/Password";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}, 
{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    }
}
);

userSchema.pre<UserDocument>('save', async function(next){
    const hashPassword =  await Password.toHash(this.get('password'));
    this.set('password', hashPassword);
    next();
});

interface UserAttr {
    email:string;
    password: string;
}

interface UserDocument extends mongoose.Document{
    email:string;
    password: string;
}

userSchema.statics.build = (attr:UserAttr):UserDocument=>{
    return new User(attr);
}

interface UserModel extends mongoose.Model<UserDocument>{
    build(attr: UserAttr):UserDocument;
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
export {User};









