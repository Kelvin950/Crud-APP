const express =  require("express");
const logger =  require("morgan");
const path =  require("path");
const dotenv =  require("dotenv");

const home =  require("./server/route/homeroute");
const app  =  express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:false}));

app.set("view engine" , "ejs");
app.set("views" , path.resolve(__dirname, "views"));

app.set("/css" , express.static(path.resolve(__dirname , "asserts/css")));
app.set("/img" , express.static(path.resolve(__dirname , "asserts/img")));
app.set("/js" , express.static(path.resolve(__dirname , "asserts/js")));
app.use("/" , home);
app.use(function(req,res){
    
    res.status(400);
    res.render("404" , {message:"file not found"});
})

app.listen(8080 , ()=>{
    console.log(`Server is running at http://localhost:${8080}`);
})