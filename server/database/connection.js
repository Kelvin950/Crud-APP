const mongoose =  require("mongoose");
const url =  'mongodb://127.0.0.1:27017/NewLeaders' ;
const connectDb =  async function(){

     try{
    const connect =  await mongoose.connect(url , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    })
    console.log(`MongoDb connected : ${connect.connection.host}`);
     }catch(err){
         console.log(err);
     }
}

module.exports =  connectDb;