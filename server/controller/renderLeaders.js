const leader = require("../model/leaderModule");
const {errorHandler ,deleteImage} = require("../../util/errorHandler");

const {validationResult}  =  require("express-validator");
exports.find  =  async  function(req, res , next){
   try
   {    const leaders = await  leader.find();

    if(!leaders)errorHandler(req ,res, next , "No leaders found" , 401);
      res.status(200);
      res.setHeader("Content-Type" , "application/json");
      res.json({leaders:leaders});
     
   } catch(err){
       if(!err.statusCode){
           err.statusCode = 500;
       }
             next(err);
   }

}
exports.create   =  async function(req,res ,next){
  

    console.log(req.body);
    try {

        if(!req.body){
            errorHandler(req ,res,next , "Must include  body" ,400);
 }

  const errors  = validationResult(req);
  if(!errors.isEmpty()){

    errorHandler(req , res, next ,"validation failed" , 422 , errors.array());
  }
        if(!req.file){
            errorHandler(req , res,next , "No image file uploaded" ,422);
        }
      
         const newleader =  new leader({
         name:req.body.name,
         image:req.file.path.replace(/\\/g ,"/"),
         designation:req.body.designation,
         abbr:req.body.abbr,
         description:req.body.description,
         featured:req.body.featured
         })
         const data =  await newleader.save();
               res.status(200);
               res.setHeader("Content-Type", "application/json");
               res.json({leader:data});
    } catch (err) {
           
        if(!err.statusCode){
            err.statusCode =500;
        }
        next(err);
    }
}

exports.update =  async function(req, res){
    res.status(404);
    res.end("operation not supported")
}

exports.delete =  async function(req, res ,next){
    try{
        
    
    const leaders = await leader.find();
            leaders.forEach(leader=>{
                
                deleteImage(leader.image);
            })
            await leader.deleteMany({});
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.json({message:"deleted successfully"});

}
    catch(err){
          if(!err.statusCode){
            err.statusCode =  500;
          }
      
        next(err);
    }
}



exports.findId=   async function(req,res , next){
try{
 
    const id   =  req.params.id;
  
      const singleLeader  =  await leader.findById(id);
              
      if(!singleLeader) errorHandler(req ,res,next , "leader does not exist" , 401);
           res.status(200)
           res.json({
               leader:singleLeader
           })}
           catch(err){
             if(!err.statusCode){
                 err.statusCode = 500;
             }
             next(err);
           }
        
     

}
exports.createById =  async function(req, res){
    res.status(404);
    res.end("operation not supported")
}

exports.updateId =  async function(req,res ,next){

   
    try{
        if(!req.body){
       
            errorHandler(req ,res,next , "Must include a body" , 400);
          }

          const errors  = validationResult(req);
          if(!errors.isEmpty()){
                console.log(errors);
            errorHandler(req , res, next ,"validation failed" , 422 , errors.array());
          }
          let image;
            if(req.file){
           
                image = req.file.path.replace(/\\/g ,"/");
        } 
         
          if(!image){
              errorHandler(req ,res,next ,"No image uploded" , 422);
          }
           const name =  req.body.name;
           const description = req.body.description;
           const abbr = req.body.abbr;
          const designation =req.body.designation;
         const featured = req.body.featured;
        const id  =  req.params.id;
        const singleLeader= await leader.findById((id));
         if(!singleLeader) errorHandler(req,res,next , "No leader found" , 404);
     
             if(singleLeader.image   !== image){
                   deleteImage(singleLeader.image);
             }
            
         singleLeader.image = image;
         singleLeader.name =  name;
         singleLeader.description =  description;
        singleLeader.abbr =  abbr;
        singleLeader.designation =  designation;
        singleLeader.featured  =  featured;
         const newLeader = await  singleLeader.save();

         res.status(200).json({message:"updated successfully", newLeader :newLeader});

    }catch(err){
   
        if(!err.statusCode){
            err.statusCode =  500;
        }
        next(err);
    }
}

exports.deleteByid =  async function(req, res , next){
    try{
     
              const leaderId =  req.params.id
      
               const data=  await leader.findById(leaderId);
               if(!data){
                   errorHandler(res,req ,next ,"leader not found" ,404);
               }
               deleteImage(data.image);
               await  leader.findByIdAndRemove(leaderId);

               res.status(200);
               res.json({message:"deleted successfully"}) 
    }catch(err){
       if(!err.statusCode){
           err.statusCode =  500;

       }
       next(err);
    }
}