const cors =  require("cors");
const express =  require("express");
const app =  express();


const whiteList =  ["http://127.0.0.1:5500" ,"http://localhost:8080"];

const corsWithOption =  {
       
    origin: function(origin , callback){
        if(whiteList.indexOf(origin)!==-1){
            callback(null , true);
        }
        else{
            callback(new Error(`Not allowed by cors`))
        }
    }
}


exports.corsOption = cors(corsWithOption);  
