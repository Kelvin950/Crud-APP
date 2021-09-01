  const fs =  require("fs");
  const path =  require("path");
exports.errorHandler =   (req,res,next, errorMessage , errorStatusCode , errorData)=>{

    const error = new Error(errorMessage);
    error.statusCode =  errorStatusCode ;
    error.data =  errorData ;
    throw error;
}

exports.deleteImage =  filepath=>{
 let fp  = path.resolve(__dirname ,".." , filepath);
    fs.unlink(fp , (err)=>{
     
        if(err){
            throw err;
        }
    })
}