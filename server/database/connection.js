const mongoose =  require("mongoose");
const url =  `mongodb+srv://Kelvin:#####.@cluster0.kfxq1.mongodb.net/NewServer?retryWrites=true&w=majority`
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