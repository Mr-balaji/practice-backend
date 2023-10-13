const { response } = require("express");
const express = require("express");
const { updateOne } = require("./modals/user");
const User = require("./modals/user");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const usermodal = require("./modals/user")

app.use(bodyParser.json());
require("./db/conn")

app.use("/api/user", userRoute);

app.get("/show",async(request,response) =>{
  try{
    const user = await User.find({})
     response.status(200).json(user);
   //   console.log(user)
  }catch(err){
   response.status(400).json(err);
  }
})


app.post("/resister",async(req,res)=>{

  const  name = req.body.name;
  const email = req.body.email;
  const password= req.body.password;



          const mainuser = new usermodal(
              {
                  name,
                  email,
                  password,
              }
          )
          mainuser.save(err =>{
              if(err){
                  console.log(err)
              }else{
                  res.send({message:"resiste successfull"});
              }
          })

})


const router = express.Router();


  const PORT = process.env.PORT || 8000;
  app.listen(PORT,()=>{
    console.log("lisning" +PORT);
})


module.exports = router;