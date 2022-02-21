export abstract class CustomError extends Error{
  
    errorCode= 400;
    abstract serializeError():{}[];
};
