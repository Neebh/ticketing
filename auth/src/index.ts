import express, { NextFunction, Request, Response } from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import {errorHandler} from './middlewares/error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { CustomError } from './errors/CustomError';

const app = express();
app.use(cookieSession({
    signed: false
}));
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

const start = async ()=>{
        try{
            await mongoose.connect('mongodb://auth-mongo-srv:27017/abc');
            console.log("Connect to mongodb");
        }catch(err){    
            console.error(err);
        }
        
        app.listen(3000, ()=>{
            console.log('listening on 3000');
        });
}


start();

