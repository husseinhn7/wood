 const  errorController = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    err.massage = err.massage  
    res.status(err.statusCode).json({
        status : err.status,
        massage : err.massage
    })
}



export const catchAsync = fn =>{
    return (req, res, next) =>{
        fn(req, res, next).then(next)
    }
}






export default errorController   