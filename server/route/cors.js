const cors =  require("cors");
const express =  require("express");
const app =  express();




const whiteList =  ["http://127.0.0.1:5500"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


exports.corsOptions =  cors(corsOptionsDelegate);