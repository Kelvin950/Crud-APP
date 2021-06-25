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

