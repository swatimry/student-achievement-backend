
export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message||" some Internal server error" ;
    err.statusCode=err.statusCode||500;
    res.status(err.statusCode).json({
     success:false,
     message:err.message
    })
 }
 //when use async we need try catch ,make middleware as trycatch replacement
 export const asyncError=(passedFunction)=>(req,res,next)=>{
    Promise.resolve(passedFunction(req,res,next)).catch(next);
 };