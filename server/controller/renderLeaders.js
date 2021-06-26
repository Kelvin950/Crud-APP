const leader = require("../model/leaderModule");

exports.find  =  async  function(req, res){
   try
   {    const leaders = await  leader.find();
      res.status(200);
      res.setHeader("Content-Type" , "application/json");
      res.json(leaders);
      if(!leaders)throw new Error("No leaders found");
   } catch(err){
       res.status(500);
       console.log(err);
   }

}
exports.create   =  async function(req,res){
    if(!req.body){
        res.status(500);
    }
    console.log(req.body);
    try {
        if(!req.body)throw new Error("Body cannot be empty")
         const newleader =  new leader({
         name:req.body.name,
         image:req.file.path,
         designation:req.body.designation,
         abbr:req.body.abbr,
         description:req.body.description,
         featured:req.body.featured
         })
         const data =  await newleader.save(newleader);
               res.status(200);
               res.setHeader("Content-Type", "application/json");
               res.json(data);
    } catch (err) {
            res.status(403);
            console.log(err.message);
    }
}

exports.update =  async function(req, res){
    res.status(404);
    res.end("operation not supported")
}

exports.delete =  async function(req, res){
    try{
    const leadersDelete = await leader.deleteMany({});
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.end("deleted succeefully");

if(!leadersDelete)throw new Error("Could not delete");}
    catch(err){
           res.status(500);
           console.log(err.message);
    }
}



exports.findId=   async function(req,res){
try{
 
    const id   =  req.params.id;
  
      const singleLeader  =  await leader.findById(id);
              
      if(!singleLeader) res.status(404).send({message:"NO leader found"});
           res.status(200)
           res.send(singleLeader)}
           catch(err){
               res.send({error:err.message})
           }
        
     

}
exports.createById =  async function(req, res){
    res.status(404);
    res.end("operation not supported")
}

exports.updateId =  async function(req,res){

    if(!req.body){
        res.status(400).send({message:"Must include body"})
    }
    try{
        const id  =  req.params.id;
        const singleLeader= await leader.findByIdAndUpdate((id) , {$set:req.body} , {new:true});
         if(!singleLeader)res.status(400).send({message:"failed"});
        res.status(200);
        res.send(singleLeader);

    }catch(err){
        res.send({error:err.message})
    }
}

exports.deleteByid =  async function(req, res){
    try{
     
     
      
               const data=  await leader.findByIdAndDelete({_id:req.params.id});
               if(!data) res.status(404).send({message:"Leader not deleted maybe leader does not exist"})
               res.status(200)
               res.send({message:"deleted successfully"}) 
    }catch(err){
         res.send({err:err.message})
    }
}