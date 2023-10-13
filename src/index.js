const express = require("express");
const dotenv = require("dotenv");
const App = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000

// dotenv.config({path:"./.env"});
require("../db/conn");

//   all uses 
App.use(cors());      
App.use(express.json());
App.use(require("../auth"));


// const middleware = (req,res,next) =>{
//     console.log("hello my middleware");
//     next();
// }

// App.post("/re",(req,res) =>{
//  console.log(req.body);
// })

App.listen(PORT,()=>{
    console.log("lisning on port no "+PORT);
})