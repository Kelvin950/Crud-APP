const express =  require("express");
const logger =  require("morgan");
const path =  require("path");
const dotenv =  require("dotenv");
const connectDb=  require("./server/database/connection")
const home =  require("./server/route/homeroute");
const leadersRouter =  require("./server/route/leadersRoute");
const userRouter =  require("./server/route/UserRoute");
const useragent = require("express-useragent");

const app  =  express();

const cors =require("cors");
connectDb();
app.use(logger("dev"));
app.use(useragent.express());
app.use(express.urlencoded({extended:false}));

app.set("view engine" , "ejs");
app.set("views" , path.resolve(__dirname, "views"));

app.use("/css" , express.static(path.resolve(__dirname , "asserts/css")));
app.use("/img" , express.static(path.resolve(__dirname , "asserts/img")));
app.use("/js" , express.static(path.resolve(__dirname , "asserts/js")));
app.use("/" , home);
app.use("/auth" , userRouter);
app.use("/leaders", leadersRouter);

app.use(function(req,res){
    
    res.status(404);
    res.render("404" , {message:"file not found"});
})


app.use((error , req ,res , next)=>{
  
     console.log(error);
    res.status(error.statusCode||500).json({
     errorMessage:error.message   ,
     errorData :error.data
    })
});

app.listen(8080 , ()=>{
    console.log(`Server is running at http://localhost:${8080}`);
})