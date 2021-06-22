const mongoose =  require("mongoose");
const Schema= mongoose.Schema;


const leader =  new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    }

    ,
    image:{
        type:String,
        require:true
    }
    ,
    designation:{
        type:String,
        required:true,
        unique:true
    },

 abbr:{
     type:String,
     required:true
 } 
 ,
 description:{
     type:String,
     required:true
 },
 featured:{
     type:String,
     default:false
 }
})


const leaderModel =  mongoose.model("leader" ,leader )
module.exports = leaderModel;